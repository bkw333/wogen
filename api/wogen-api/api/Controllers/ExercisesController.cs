using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        private readonly ExerciseService _exerciseService;

        public ExercisesController(ExerciseService exercisesService)
        {
            _exerciseService = exercisesService;
        }

        [HttpGet]
        public ActionResult<List<Exercise>> Get()
        {
            return _exerciseService.Get();
        }

        [HttpGet("{id:length(24)}", Name = "GetExercise")]
        public ActionResult<Exercise> Get(string id)
        {
            var exercise = _exerciseService.Get(id);

            if (exercise == null)
            {
                return NotFound();
            }

            return exercise;
        }

        [HttpPost]
        public ActionResult<Exercise> Create(Exercise exercise)
        {
            _exerciseService.Create(exercise);

            return CreatedAtRoute("GetExercise", new {id = exercise.Id.ToString()}, exercise);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Exercise exerciseIn)
        {
            var exercise = _exerciseService.Get(id);

            if (exercise == null)
            {
                return NotFound();
            }

            _exerciseService.Update(id, exerciseIn);
            return NoContent();
        }

        [HttpDelete]
        public IActionResult Delete(string id)
        {
            var exercise = _exerciseService.Get(id);
            if (exercise == null)
            {
                return NotFound();
            }
            _exerciseService.Remove(exercise.Id);

            return NoContent();
        }
    }
}
