using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using Xunit;

namespace ExampleSpace.Test
{
    public class ExampleClassFooTest
    {
        [Fact]

        public async void TestHandler()
        {
            var obj = new ExampleClassFoo();
            var response = await obj.Handler();

            Assert.Equal("Done: Foo", response);
        }
    }
}