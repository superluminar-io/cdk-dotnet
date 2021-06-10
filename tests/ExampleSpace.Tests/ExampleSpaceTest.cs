using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using Xunit;

namespace ExampleSpace.Test
{
    public class ExampleSpaceTest
    {
        [Fact]

        public async void TestHandler()
        {
            var obj = new ExampleClass();
            var response = await obj.Handler();

            Assert.Equal("Done", response);
        }
    }
}