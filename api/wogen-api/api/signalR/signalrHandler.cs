using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.SignalR;

namespace api.signalR
{
    public class SignalrHandler
    {

        private readonly IHubContext<ExercisesHub> _exerciseHubContext;

        public SignalrHandler(IHubContext<ExercisesHub> exerciseHubContext)
        {
            _exerciseHubContext = exerciseHubContext;
        }
        public async Task SendMessage(string message, Exercise exercise)
        {
            if (exercise == null)
            {
                var emptyExercise = new Exercise();
                await _exerciseHubContext.Clients.All.SendAsync(message, emptyExercise);
            }
            await _exerciseHubContext.Clients.All.SendAsync(message, exercise);
        }
    }
}
