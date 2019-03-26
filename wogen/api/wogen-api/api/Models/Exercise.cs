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

        [BsonElement("Type")]
        public int Type { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonElement("Area")]
        public int Area { get; set; }
        [BsonElement("Easy")]
        public int Easy { get; set; }

        [BsonElement("Medium")]
        public int Medium { get; set; }

        [BsonElement("Extreme")]
        public int Extreme { get; set; }

        [BsonElement("Equipment")]
        public int Equipment { get; set; }

        
    }


}
