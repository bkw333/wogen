using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Exercise
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Area")]
        public int Area { get; set; }
        [BsonElement("Intensity")]
        public int Intensity { get; set; }

        [BsonElement("EMOM")]
        public int EMOM { get; set; }

        [BsonElement("AMRAP")]
        public int AMRAP { get; set; }

        [BsonElement("Strength")]
        public int Strength { get; set; }

        [BsonElement("Type")]
        public int Type { get; set; }
    }


}
