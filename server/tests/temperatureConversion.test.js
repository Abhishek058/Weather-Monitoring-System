function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }
  
  test('Kelvin to Celsius conversion', () => {
    expect(kelvinToCelsius(273.15)).toBeCloseTo(0, 2);
    expect(kelvinToCelsius(373.15)).toBeCloseTo(100, 2);
    expect(kelvinToCelsius(0)).toBeCloseTo(-273.15, 2);
  });