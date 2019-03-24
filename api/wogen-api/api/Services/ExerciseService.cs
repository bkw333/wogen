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
        private readonly IMongoCollection<Exercise> _emomExercises;
        private readonly IMongoCollection<Exercise> _amrapExercises;
        private readonly IMongoCollection<Exercise> _strengthExercises;

        public ExerciseService(IConfiguration config)
        {
            var client = new MongoClient(config.GetConnectionString("exerciseDB"));
            var database = client.GetDatabase("ExerciseDB");

            _emomExercises = database.GetCollection<Exercise>("emomExercises");
            _amrapExercises = database.GetCollection<Exercise>("amrapExercises");
            _strengthExercises = database.GetCollection<Exercise>("strengthExercises");
        }

        public List<Exercise> Get(string type)
        {

            if (type.toUpperCase() == "EMOM")
            {
                return _emomExercises.Find(exercise => true).ToList();
            }

            if (type.toUpperCase() == "AMRAP")
            {
                return _amrapExercises.Find(exercise => true).ToList();
            }

            if (type.toUpperCase() == "STRENGTH")
            {
                return _strengthExercises.Find(exercise => true).ToList();
            }


        }

        public Exercise Get(string type, string id)
        {
            

            if (type.toUpperCase() == "EMOM")
            {
                return _emomExercises.Find<Exercise>(exercise => exercise.Id == id).FirstOrDefault();
            }

            if (type.toUpperCase() == "AMRAP")
            {
                return _amrapExercises.Find<Exercise>(exercise => exercise.Id == id).FirstOrDefault();
            }

            if (type.toUpperCase() == "STRENGTH")
            {
                return _strengthExercises.Find<Exercise>(exercise => exercise.Id == id).FirstOrDefault();
            }
        }
        
        public Exercise Create(string type, Exercise exercise)
        {
            if (type.toUpperCase() == "EMOM")
            {
                _emomExercises.InsertOne(exercise);
                return exercise;
            }

            if (type.toUpperCase() == "AMRAP")
            {
                _amrapExercises.InsertOne(exercise);
                return exercise;
            }

            if (type.toUpperCase() == "STRENGTH")
            {
                _strengthExercises.InsertOne(exercise);
                return exercise;
            }
        }

        public void Update(string type, string id, Exercise exerciseIn)
        {
            if (type.toUpperCase() == "EMOM")
            {
                _emomExercises.ReplaceOne(exercise => exercise.Id == id, exerciseIn);
            }

            if (type.toUpperCase() == "AMRAP")
            {
                _amrapExercises.ReplaceOne(exercise => exercise.Id == id, exerciseIn);

            }

            if (type.toUpperCase() == "STRENGTH")
            {
                _strengthExercises.ReplaceOne(exercise => exercise.Id == id, exerciseIn);
            }
        }

        public void Remove(string type, Exercise exerciseIn)
        {
            if (type.toUpperCase() == "EMOM")
            {
                _emomExercises.DeleteOne(exercise => exercise.Id == exerciseIn.Id);
            }

            if (type.toUpperCase() == "AMRAP")
            {
                _amrapExercises.DeleteOne(exercise => exercise.Id == exerciseIn.Id);
            }

            if (type.toUpperCase() == "STRENGTH")
            {
                _strengthExercises.DeleteOne(exercise => exercise.Id == exerciseIn.Id);
            }
        }

        public void Remove(string type, string id)
        {
            if (type.toUpperCase() == "EMOM")
            {
                _emomExercises.DeleteOne(exercise => exercise.Id == id);
            }

            if (type.toUpperCase() == "AMRAP")
            {
                _amrapExercises.DeleteOne(exercise => exercise.Id == id);
            }

            if (type.toUpperCase() == "STRENGTH")
            {
                _strengthExercises.DeleteOne(exercise => exercise.Id == id);
            }
        }
    }
}
