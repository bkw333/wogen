using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.SignalR;

namespace api.signalR
{
    public class ExercisesHub : Hub
    {
        public Task Send(Exercise data)
        {
            return Clients.All.SendAsync("Send", data);
        }
    }
}
