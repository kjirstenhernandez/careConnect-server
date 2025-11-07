import { Request, Response } from 'express';
import prisma from '../prisma/client';
import {
  checkLocationExists,
  findProviderById,
} from '../services/providerService';
import { ObjectId } from 'mongodb';

export const getProviderById = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    const providerInfo = await prisma.providers.findUnique({
      where: { id: providerId },
    });
    if (providerInfo == null) {
      return res.status(400).json({ message: "Provider doesn't exist" });
    }
    return res.status(200).json({ providerInfo });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to get provider details' });
  }
};

export const getAllProviders = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search?.toString().trim() || req.query.q?.toString().trim();
    const specialtyQuery = req.query.specialty?.toString().trim();
    
    let providers = await prisma.providers.findMany();
    
    if (providers == null) {
      return res.status(400).json({ message: 'No Providers' });
    }
    
    // Filter by specialty if provided
    if (specialtyQuery) {
      const specialtyLower = specialtyQuery.toLowerCase();
      providers = providers.filter(provider => 
        provider.specialty.toLowerCase().includes(specialtyLower)
      );
    }
    
    // If there's a search query, filter providers using fuzzy search
    if (searchQuery) {
      const queryLower = searchQuery.toLowerCase();
      const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);
      
      providers = providers.filter(provider => {
        const firstNameLower = provider.firstName.toLowerCase();
        const lastNameLower = provider.lastName.toLowerCase();
        const fullNameLower = `${firstNameLower} ${lastNameLower}`;
        const specialtyLower = provider.specialty.toLowerCase();
        
        // For multi-word queries, check if all words match anywhere in the name or specialty
        if (queryWords.length > 1) {
          // Check if all query words are found in the full name or specialty
          return queryWords.every(word => 
            fullNameLower.includes(word) || 
            firstNameLower.includes(word) || 
            lastNameLower.includes(word) ||
            specialtyLower.includes(word)
          );
        } else {
          // Single word: check if it matches firstName, lastName, full name, or specialty
          const singleWord = queryWords[0];
          return firstNameLower.includes(singleWord) || 
                 lastNameLower.includes(singleWord) ||
                 fullNameLower.includes(singleWord) ||
                 specialtyLower.includes(singleWord);
        }
      });
    }
    
    return res.status(200).json({ providers });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to get providers' });
  }
};

// Add new provider into provider database
export const addProvider = async (req: Request, res: Response) => {
  const { firstName, lastName, credentials, specialty, locations, phone, fax } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !credentials ||
    !specialty ||
    !locations ||
    !phone
  ) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const newProvider = await prisma.providers.create({
      data: {
        firstName,
        lastName,
        credentials,
        specialty,
        locations,
        phone,
        fax,
      },
    });
    res.status(200).json({ message: 'Provider succesfully created' });
  } catch (error) {
    console.error('error creating provider: ', error);
    return res
      .status(500)
      .json({ error: 'Server error while creating provider' });
  }
};

export const getProviderLocations = async (req: Request, res: Response) => {
  try {
    const providerId = req.params.id;
    const provider = await findProviderById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider Not Found' });
    }

    const locations = await prisma.providers.findUnique({
      where: {
        id: providerId,
      },
      select: {
        locations: true,
      },
    });
    return res.status(200).json({ locations });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Add new location to provider's locations list
export const addProviderLocation = async (req: Request, res: Response) => {
  try {
    const { providerId, location } = req.body;
    const provider = await findProviderById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider Not Found' });
    }
    if (!checkLocationExists(provider, location)) {
      return res.status(200).json({ message: 'Location already exists' });
    }
    const updatedProvider = await prisma.providers.update({
      where: {
        id: providerId,
      },
      data: {
        locations: {
          push: location,
        },
      },
    });

    return res.status(200).json({
      message: 'Location added succesfully',
      provider: updatedProvider,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getMultipleProvidersByIDs = async (
  req: Request,
  res: Response
) => {
  const { clinicId } = req.body;
  try {
    console.log('clinicId:', clinicId, typeof clinicId);
    const providers = await prisma.providers.findMany({
      where: {
        locations: {
          some: {
            id: clinicId,
          },
        },
      },
    });
    return res.status(200).json({ providers });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateProvider = async (req: Request, res: Response) => {
  const { providerId } = req.params;
  const { firstName, lastName, credentials, specialty, locations, phone, fax } = req.body;
  try {
    const updatedProvider = await prisma.providers.update({
      where: { id: providerId },
      data: { firstName, lastName, credentials, specialty, locations, phone, fax },
    });
    return res.status(200).json({ message: 'Provider updated', updatedProvider });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};


export const deleteProviderLocation = async (req: Request, res: Response) => {
  try {
    const { providerId, location } = req.body;
    const provider = await findProviderById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider Not Found'})
    }

    const updatedProvider = await prisma.providers.update({
      where: {
        id: providerId,
      },
      data: {
        locations: {

        }
      }
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const deleteProvider = async (req: Request, res: Response) => {
  const { providerId } = req.params;
  try {
    const deletedProvider = await prisma.providers.delete({
      where: { id: providerId },
    });
  
  return res.status(200).json({ message: 'Provider deleted', deletedProvider });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};