using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using Xunit;

namespace ExampleSpace.Test
{
    public class ExampleClassBarTest
    {
        [Fact]

        public async void TestHandler()
        {
            var obj = new ExampleClassBar();
            var response = await obj.Handler();

            Assert.Equal("Done: Bar", response);
        }
    }
}