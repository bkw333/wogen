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

        [BsonElement("Beginner")]
        public int Beginner { get; set; }

        [BsonElement("Advanced")]
        public int Advanced { get; set; }
        
        [BsonElement("Extreme")]
        public int Extreme { get; set; }

        [BsonElement("Equipment")]
        public int Equipment { get; set; }
    }


}
