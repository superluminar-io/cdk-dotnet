# CDK Example

## Usage

You need to have the [`dotnet` SDK](https://dotnet.microsoft.com/download/dotnet/3.1) in version 3.1 on your computer.

### Build ExampleSpace

```bash
$ > dotnet build src/ExampleSpace/ExampleSpace.csproj --no-restore
```

### Testing ExampleSpace

```bash
$ > dotnet test tests/ExampleSpace.Tests/ExampleSpaceTest.csproj --no-restore
```

## Troubleshooting

```bash
$ > dotnet --version
5.0.203

$ > dotnet --list-sdks
3.1.409 [/usr/local/share/dotnet/sdk]
3.1.410 [/usr/local/share/dotnet/sdk]
5.0.203 [/usr/local/share/dotnet/sdk]
```