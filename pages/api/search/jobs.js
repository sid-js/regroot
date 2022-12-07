import clientPromise from "../../../lib/mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("regroot");
  const {q,page} = req.query;
  const pageIndex = page?page*10:0;
  const ag = [
    {
      '$search': {
        'index': 'default', 
        'text': {
          'query': q, 
          'path': {
            'wildcard': '*'
          }
        }
      }
    }, {
      '$skip': pageIndex
    }, {
      '$limit': 10
    }, {
      '$addFields': {
        'score': {
          '$meta': 'searchScore'
        }
      }
    }
  ]
  const jobData = await db.collection("jobs").aggregate(ag).toArray();
  console.log(jobData);
  res.json({jobs: jobData});
};
