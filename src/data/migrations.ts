import { CustomError } from '../business/error/CustomError';
import { BaseDatabase } from './BaseDatabase';

export class migrations extends BaseDatabase {

 public async createTables() {
  try {
   await BaseDatabase.connection
    .raw(
     `
    CREATE TABLE establishment (
     id VARCHAR(255) PRIMARY KEY NOT NULL,
     name VARCHAR(255) NOT NULL,
     state VARCHAR(255) NOT NULL,
     city VARCHAR(255) NOT NULL,
     cep VARCHAR(255) NOT NULL,
     adress VARCHAR(255) NOT NULL,
     tel VARCHAR(255) NOT NULL,
     workingTime VARCHAR(255) NOT NULL,
     howToDiscart VARCHAR(255) NOT NULL,
     howDoesDiscart VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE discart (
     id VARCHAR(255) PRIMARY KEY NOT NULL,
     name VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE estab_discar (
     id VARCHAR(255) PRIMARY KEY NOT NULL,
     id_establishment VARCHAR(255) NOT NULL,
     id_discart VARCHAR(255) NOT NULL,
     FOREIGN KEY (id_establishment ) REFERENCES establishment(id),
     FOREIGN KEY (id_discart ) REFERENCES discart(id)
    );
    `
    )
  } catch (error) {
   throw new CustomError(500, "An unexpected error ocurred in create tables")
  }
 }
}