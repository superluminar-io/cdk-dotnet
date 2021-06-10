using Amazon.Lambda.Core;
using System.Threading.Tasks;
using System;

namespace ExampleSpace
{
    public class ExampleClassBar
    {
        [LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

        public async Task<string> Handler()
        {
            var task1 = Task.Run(() => Console.WriteLine("Logging Output #1"));
            var task2 = Task.Run(() => Console.WriteLine("Logging Output #2"));
            var task3 = Task.Run(() => Console.WriteLine("Logging Output #3"));

            await Task.WhenAll(task1, task2, task3);

            return "Done: Bar";
        }
    }
}