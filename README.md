# Agova

Analyzing FEC data on political spending

## Setup
 - Install node dependencies ```yarn install```
 - Install postgress using your package manager of choice (```brew install postgres```)
 - Start the postgres service ```brew services start postgresql```
 - Initialize the database ```yarn run db:init```
 
## Loading Data
 - 2016 Presidential Data ```yarn run load:2016```


## Useful Resources

 - [FEC API Documentation](https://api.open.fec.gov/developers/)
 - [FEC Comittee Designations](https://classic.fec.gov/finance/disclosure/metadata/CommitteeTypeCodes.shtml)
 - [Sequelize Documentation](http://docs.sequelizejs.com/)
 - [GEXF Graph Format](https://gephi.org/gexf/format/)
