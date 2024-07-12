export const MAX_REQUEST_NUMBER = 25;

// complete queries
export const findLaureateQuery = {
  'operationName': 'FindLaureate',
  'query': 'query FindLaureate { findLaureate { laureates { id firstname surname birthDate deathDate birthLocation deathLocation gender laureatePrizes { id prize { id year category share motivation createdAt updatedAt deletedAt } institution { id name headquarters createdAt updatedAt deletedAt } createdAt updatedAt deletedAt } createdAt updatedAt deletedAt } total } }',
  'variables': {},
};

export const findPrizeQuery = {
  'operationName': 'FindPrize',
  'query': 'query FindPrize { findPrize { prizes { id year category share motivation laureatePrizes { id laureate { id firstname surname birthDate deathDate birthLocation deathLocation gender createdAt updatedAt deletedAt } institution { id name headquarters createdAt updatedAt deletedAt } createdAt updatedAt deletedAt } createdAt updatedAt deletedAt } total } }',
  'variables': {},
};

export const findInstitutionQuery = {
  'operationName': 'FindInstitution',
  'query': 'query FindInstitution { findInstitution { institutions { id name headquarters laureatePrizes { id prize { id year category share motivation createdAt updatedAt deletedAt } laureate { id firstname surname birthDate deathDate birthLocation deathLocation gender createdAt updatedAt deletedAt } createdAt updatedAt deletedAt } createdAt updatedAt deletedAt } total } }',
  'variables': {},
};

export const findLaureatePrizeQuery = {
  'operationName': 'FindLaureatePrize',
  'query': 'query FindLaureatePrize { findLaureatePrize { laureatePrizes { id prize { id year category share motivation createdAt updatedAt deletedAt } laureate { id firstname surname birthDate deathDate birthLocation deathLocation gender createdAt updatedAt deletedAt } institution { id name headquarters createdAt updatedAt deletedAt } createdAt updatedAt deletedAt } total } }',
  'variables': {},
};

// partial queries
export const findLaureatePartialQuery = {
  'operationName': 'FindLaureate',
  'query': 'query FindLaureate { findLaureate { laureates { id firstname surname birthDate deathDate birthLocation deathLocation gender laureatePrizes { id prize { id year category share motivation } institution { id name headquarters } } } total } }',
  'variables': {},
}

export const findPrizePartialQuery = {
  'operationName': 'FindPrize',
  'query': 'query FindPrize { findPrize { prizes { id year category share motivation laureatePrizes { id laureate { id firstname surname birthDate deathDate birthLocation deathLocation gender } institution { id name headquarters } } } total } }',
  'variables': {},
}

export const findInstitutionPartialQuery = {
  'operationName': 'FindInstitution',
  'query': 'query FindInstitution { findInstitution { institutions { id name headquarters laureatePrizes { id prize { id year category share motivation } laureate { id firstname surname birthDate deathDate birthLocation deathLocation gender } } } total } }',
  'variables': {},
}

export const findLaureatePrizePartialQuery = {
  'operationName': 'FindLaureatePrize',
  'query': 'query FindLaureatePrize { findLaureatePrize { laureatePrizes { id prize { id year category share motivation } laureate { id firstname surname birthDate deathDate birthLocation deathLocation gender } institution { id name headquarters } } total } }',
  'variables': {},
}

// minimum queries
export const findLaureateMinimumQuery = {
  'operationName': 'FindLaureate',
  'query': 'query FindLaureate { findLaureate { laureates { id firstname surname laureatePrizes { id prize { id } institution { id } } } total } }',
  'variables': {},
}

export const findPrizeMinimumQuery = {
  'operationName': 'FindPrize',
  'query': 'query FindPrize { findPrize { prizes { id year category laureatePrizes { id laureate { id } institution { id } } } total } }',
  'variables': {},
}

export const findInstitutionMinimumQuery = {
  'operationName': 'FindInstitution',
  'query': 'query FindInstitution { findInstitution { institutions { id name headquarters laureatePrizes { id prize { id } laureate { id } } } total } }',
  'variables': {},
}

export const findLaureatePrizeMinimumQuery = {
  'operationName': 'FindLaureatePrize',
  'query': 'query FindLaureatePrize { findLaureatePrize { laureatePrizes { id prize { id } laureate { id } institution { id } } total } }',
  'variables': {},
}
