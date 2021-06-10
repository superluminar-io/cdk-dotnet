using Amazon.Lambda.Core;
using System.Collections.Generic;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace ExampleSpace
{
    public class ExampleClass
    {
        [LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

        public async Task<string> Handler()
        {
            var task1 = Task.Run(() => Console.WriteLine("Logging Output #1"));
            var task2 = Task.Run(() => Console.WriteLine("Logging Output #2"));
            var task3 = Task.Run(() => Console.WriteLine("Logging Output #3"));

            await Task.WhenAll(task1, task2, task3);

            return "Done";
        }
    }
}