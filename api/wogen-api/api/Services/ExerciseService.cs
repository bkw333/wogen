using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace api.Services
{
    public class ExerciseService
    {
        private readonly IMongoCollection<Exercise> _exercises;

        public ExerciseService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("exerciseDB"));
            var database = client.GetDatabase("ExerciseDB");
            _exercises = database.GetCollection<Exercise>("exercises");
        }

        public List<Exercise> Get()
        {
            return _exercises.Find(exercise => true).ToList();
        }

        public Exercise Get(string id)
        {
            return _exercises.Find<Exercise>(exercise => exercise.Id == id).FirstOrDefault();
        }

        public Exercise Create(Exercise exercise)
        {
            _exercises.InsertOne(exercise);
            return exercise;
        }

        public void Update(string id, Exercise exerciseIn)
        {
            _exercises.ReplaceOne(exercise => exercise.Id == id, exerciseIn);
        }

        public void Remove(Exercise exerciseIn)
        {
            _exercises.DeleteOne(exercise => exercise.Id == exerciseIn.Id);
        }

        public void Remove(string id)
        {
            _exercises.DeleteOne(exercise => exercise.Id == id);
        }
    }
}
