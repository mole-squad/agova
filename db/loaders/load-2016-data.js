const fs = require('fs');
const db = require('../models');

const candidateJson = require('../../data/presidential-candidates-2016.json');
const committeeJson = require('../../data/non-super-pac-committees-2016.json');

const LOG_PATH = './errors.txt';

let candidates;
let committees;

const errors = [];

const writeLogs = (error) => {
  console.log('Writing errors');
  return new Promise((resolve, reject) => {
    let message = '';
    errors.forEach(anError => {
      message += anError;
      message += '\n';
    });

    fs.writeFile(LOG_PATH, message, () => {
      resolve();
    });
  });
};

db.sequelize.sync().then(() => {
  console.log('Inserting Parties');

  const partiesById = {};
  candidates = Object.keys(candidateJson).map(candidateId => {
    const theCandidate = candidateJson[candidateId];
    const partyId = theCandidate.party;
    if (!partiesById[partyId]) {
      partiesById[partyId] = theCandidate.party_full;
    }

    return {
      fullName: theCandidate.name,
      district: theCandidate.district,
      candidateId: candidateId,
      partyId: partyId
    };
  });

  const partyPromises = Object.keys(partiesById).map(partyId => {
    return db.Party.findOrCreate({
      where: { code: partyId },
      defaults: {
        name: partiesById[partyId],
        code: partyId
      }
    });
  });

  return Promise.all(partyPromises);
}).then(() => {
  console.log('Inserting Candidates');

  const candidatePromises = candidates.map(aCandidate => {
    return db.Party.findOne({
      where: { code: aCandidate.partyId }
    }).then(foundParty => {
      return db.Candidate.findOrCreate({
        where: { fullName: aCandidate.fullName },
        defaults: {
          ...aCandidate,
          partyId: foundParty && foundParty.id
        }
      });
    }).catch(error => {
      errors.push(error);
    })
  });

  return Promise.all(candidatePromises);
}).then(() => {
  console.log('Inserting Committees')

  const committeePromises = Object.keys(committeeJson).map(committeeId => {
    const aCommittee = committeeJson[committeeId];

    return db.Party.find({
      where: { code: aCommittee.party }
    }).then(foundParty => {
      return db.Committee.findOrCreate({
        where: { committeeId: committeeId },
        defaults: {
          name: aCommittee.name,
          committeeId: committeeId,
          designationFull: aCommittee.designation_full,
          state: aCommittee.state,
          typeCode: aCommittee.committee_type,
          designation: aCommittee.designation,
          typeFull: aCommittee.committee_type_full,
          firstFileDate: aCommittee.first_file_date,
          cycles: aCommittee.cycles,
          partyId: foundParty.id
        }
      });
    }).then(() => {
      return db.Committee.find({
        where: { committeeId: committeeId }
      });
    }).then(createdCommittee => {
      const candidatePromises = aCommittee.candidate_ids.map(aCandidateId => {
        return db.Candidate.find({
          where: { candidateId: aCandidateId }
        }).then(foundCandidate => {
          return db.Committee_Candidate.findOrCreate({
            where: {
              candidateId: foundCandidate.id,
              committeeId: createdCommittee.id
            },
            defaults: {
              candidateId: foundCandidate.id,
              committeeId: createdCommittee.id
            }
          });
        }).catch(() => {
          errors.push(`Failed to find candidate: ${ aCandidateId }`);
        });
      });

      return Promise.all(candidatePromises);
    });
  });

  return Promise.all(committeePromises);
}).then(() => {
  return writeLogs();
});


