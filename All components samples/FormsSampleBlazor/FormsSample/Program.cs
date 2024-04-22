using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using FormsSample;
using FormsSample.Financial;
using IgniteUI.Blazor.Controls;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<IFinancialService, FinancialService>();
RegisterIgniteUI(builder.Services);

await builder.Build().RunAsync();

void RegisterIgniteUI(IServiceCollection services)
{
    services.AddIgniteUIBlazor(
        typeof(IgbComboModule),
        typeof(IgbCheckboxModule),
        typeof(IgbDatePickerModule),
        typeof(IgbButtonModule),
        typeof(IgbRippleModule),
        typeof(IgbIconButtonModule),
        typeof(IgbInputModule),
        typeof(IgbRadioGroupModule),
        typeof(IgbRadioModule),
        typeof(IgbRatingModule),
        typeof(IgbSelectModule),
        typeof(IgbSliderModule),
        typeof(IgbSwitchModule)
    );
}