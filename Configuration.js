function getConfiguration(config)
{
  // This function allows you to indicate general configuration values
  // for all devices of this model.

  // Depending on the meaning of the "device address" in this device, 
  // you may want to change the label that is used to refer to the 
  // address in the user interface.
  // For instance, if the address of the device is actually a MAC 
  // address, you may want to use the code below.
  
   config.addressLabel = { en: "DevEUI", es: "DevEUI" };
  // config.addressLabel = {en: "MAC address", es: "Dirección MAC"};
}

function getEndpoints(deviceAddress, endpoints)
{
  // This function allows you to indicate the initial endpoint configuration
  // when a device is created using this model. This improves end-user 
  // experience significantly, because it allows the platform to create
  // all endpoints included in the device automatically when the device
  // is created.

  // In the code below, two endpoints are created. The first is a
  // temperature sensor, while the second one is a carbon dioxide sensor.

  endpoints.addEndpoint("1", "Temperature", endpointType.temperatureSensor);
  var endpoint2 = endpoints.addEndpoint("2", "Humidity", endpointType.genericSensor);
  endpoint2.variableTypeId = 1362;
  var endpoint3 = endpoints.addEndpoint("3", "Barometric Pressure", endpointType.pressureSensor);

  var endpoint4 = endpoints.addEndpoint("4", "Light Intensity", endpointType.lightSensor);

  var endpoint5 = endpoints.addEndpoint("5", "Min. Wind Direction", endpointType.genericSensor);
  endpoint5.variableTypeId = 1362;
  var endpoint6 = endpoints.addEndpoint("6", "Max. Wind Direction", endpointType.genericSensor);
  endpoint6.variableTypeId = 1362;
  var endpoint7 = endpoints.addEndpoint("7", "Avg. Wind Direction", endpointType.genericSensor);
  endpoint7.variableTypeId = 1362;
  var endpoint8 = endpoints.addEndpoint("8", "Min. Wind Speed", endpointType.genericSensor);
  endpoint8.variableTypeId = 1368;
  var endpoint9 = endpoints.addEndpoint("9", "Max. Wind Speed", endpointType.genericSensor);
  endpoint9.variableTypeId = 1368;
  var endpoint10 = endpoints.addEndpoint("10", "Avg. wind Speed", endpointType.genericSensor);
  endpoint10.variableTypeId = 1368;
  var endpoint11 = endpoints.addEndpoint("11", "Acc. Rainfall", endpointType.genericSensor);
  endpoint11.variableTypeId = 1362;
  var endpoint12 = endpoints.addEndpoint("12", "Acc. Rain Duration", endpointType.genericSensor);
  endpoint12.variableTypeId = 1362;
  var endpoint13 = endpoints.addEndpoint("13", "Rain Intensity", endpointType.genericSensor);
  endpoint13.variableTypeId = 1363;
  var endpoint14 = endpoints.addEndpoint("14", "Max. Rain Intensity", endpointType.genericSensor);
  endpoint14.variableTypeId = 1363;
  var endpoint15 = endpoints.addEndpoint("15", "Heating Tempreture", endpointType.genericSensor);
  endpoint15.variableTypeId = 1362;
  var endpoint16 = endpoints.addEndpoint("16", "Dumping of State", endpointType.genericSensor);
  endpoint16.variableTypeId = 1362;

  // endpoints.addEndpoint("2", "CO2 sensor", endpointType.ppmConcentrationSensor, ppmConcentrationSensorSubType.carbonDioxide);

}

function validateDeviceAddress(address, result)
{
  // This function allows you to validate the address of a device, when
  // the user is creating it. If your device has special validation rules
  // for the address, you can check them here, and return an error message
  // in case the address format is incorrect.

  // In the code below, a validation is made to ensure that the address 
  // is exactly 10 characters long.
  
  // if (address.length != 10) {
  //   result.ok = false;
  //   result.errorMessage = {
  //     en: "The address must be 10 characters long", 
  //     es: "La dirección debe tener exactamente 10 caracteres"
  //   };
  // }
}

function updateDeviceUIRules(device, rules)
{
  // This function allows you to specify UI rules at the device level.
  // For instance, you can make it possible to enable or disable adding
  // endpoints manually to the device after it was created.
  
  // In the code below, adding endpoints manually is disabled in the
  // user interface. This means that the device will be limited to the 
  // endpoints defined by function getEndpoints() above.
  
  // rules.canCreateEndpoints = false;
}

function updateEndpointUIRules(endpoint, rules)
{
  // This function allows you to specify UI rules at the endpoint level.
  // For instance, you can make it possible to delete certain endpoints, 
  // or edit their endpoint subtype, if applicable.

  // In the code below, the following rules are defined:
  // - Endpoints cannot be deleted.
  // - The endpoint subtype can be changed, but only for the second 
  //   endpoint.
  
  // rules.canDelete = false;
  // rules.canEditSubType = (endpoint.address == "2");
}