using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.signalR;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        private readonly ExerciseService _exerciseService;
        private readonly SignalrHandler _signalrHandler;

        public ExercisesController(ExerciseService exercisesService, SignalrHandler signalrHandler)
        {
            _exerciseService = exercisesService;
            _signalrHandler = signalrHandler;

        }

        [HttpGet]
        public ActionResult<List<Exercise>> Get(string type)
        {
            return _exerciseService.Get(type);
        }

        [HttpGet("{id:length(24)}", Name = "GetExercise")]
        public async Task<ActionResult<Exercise>> Get(string type, string id)
        {
            var exercise = _exerciseService.Get(type, id);

            if (exercise == null)
            {
                var emptyExercise = new Exercise();
                await _signalrHandler.SendMessage("OnNotFound", emptyExercise);
                return NotFound();
            }
            
            return exercise;
        }

        [HttpPost]
        public async Task<ActionResult<Exercise>> Create(string type, Exercise exercise)
        {
            exercise = _exerciseService.Create(type, exercise);
            var result = CreatedAtRoute("GetExercise", type, new {id = exercise.Id.ToString()}, exercise);
            await _signalrHandler.SendMessage("OnCreated", exercise);
            return result;
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string type, string id, Exercise exerciseIn)
        {
            var exercise = _exerciseService.Get(type, id);

            if (exercise == null)
            {
                var emptyExercise = new Exercise();
                await _signalrHandler.SendMessage("OnNotFound", emptyExercise);
                return NotFound();
            }

            await _signalrHandler.SendMessage("OnUpdated", exercise);
            _exerciseService.Update(type, id, exerciseIn);
            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string type, string id)
        {
            var exercise = _exerciseService.Get(type, id);
            if (exercise == null)
            {
                var emptyExercise = new Exercise();
                await _signalrHandler.SendMessage("OnNotFound", emptyExercise);
                return NotFound();
            }
            _exerciseService.Remove(type, exercise.Id);
            await _signalrHandler.SendMessage("OnDeleted", exercise);

            return NoContent();
        }
    }
}
