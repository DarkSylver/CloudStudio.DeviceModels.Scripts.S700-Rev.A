function parseUplink(device, payload)
{
	// This function allows you to parse the received payload, and store the 
	// data in the respective endpoints. Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device that produced the payload. 
	//   You can use "device.endpoints" to access the collection 
	//   of endpoints contained within the device. More information
	//   at https://wiki.cloud.studio/page/205
	// - payload: object containing the payload received from the device. More
	//   information at https://wiki.cloud.studio/page/208.

	// This example is written assuming a temperature and humidity sensor that 
	// sends a binary payload with temperature in the first byte, humidity 
	// in the second byte, and battery percentage in the third byte.

/*  
	// Payload is binary, so it's easier to handle as an array of bytes
	var bytes = payload.asBytes();
	
	// Verify payload contains exactly 3 bytes
	if (bytes.length != 3)
		return;

	// Parse and store temperature
	var temperatureSensor = device.endpoints.byType(endpointType.temperatureSensor);
	if (temperatureSensor != null)
	{
		var temperature = bytes[0] & 0x7f;
		if (bytes[0] & 0x80)  // Negative temperature?
			temperature -= 128;
		temperatureSensor.updateTemperatureSensorStatus(temperature);
	}

	// Parse and store humidity
	var humiditySensor = device.endpoints.byType(endpointType.humiditySensor);
	if (humiditySensor != null)
	{
		var humidity = bytes[1];
		humiditySensor.updateHumiditySensorStatus(humidity);
	}	  
	
	// Parse and store battery percentage
	var batteryPercentage = bytes[2];
	device.updateDeviceBattery({ percentage: batteryPercentage });
*/

var data = milesightDeviceDecode(payload.asBytes());


var temperatureSensor = device.endpoints.byAddress("1");
temperatureSensor.updateTemperatureSensorStatus(data['chn_1'] / 1000);


// var currentTemperature = temperatureSensor.getCurrentState().value;
// var newTemperature = data['chn_1'] / 1000;

// if (Math.abs(newTemperature - currentTemperature) <= 4) {
  
//     temperatureSensor.updateTemperatureSensorStatus(newTemperature);

// } else {

//     temperatureSensor.updateTemperatureSensorStatus(currentTemperature);
// }

var sensor2 = device.endpoints.byAddress("2").updateGenericSensorStatus(data['chn_2'] / 1000);
var sensor3 = device.endpoints.byAddress("3").updatePressureSensorStatus(data['chn_3'] / 1000);
var sensor4 = device.endpoints.byAddress("4").updateLightSensorStatus(data['chn_4'] / 1000);
var sensor5 = device.endpoints.byAddress("5").updateGenericSensorStatus(data['chn_5'] / 1000);
var sensor6 = device.endpoints.byAddress("6").updateGenericSensorStatus(data['chn_6'] / 1000);
var sensor7 = device.endpoints.byAddress("7").updateGenericSensorStatus(data['chn_7'] / 1000);
var sensor8 = device.endpoints.byAddress("8").updateGenericSensorStatus(data['chn_8'] / 1000);
var sensor9 = device.endpoints.byAddress("9").updateGenericSensorStatus(data['chn_9'] / 1000);
var sensor10 = device.endpoints.byAddress("10").updateGenericSensorStatus(data['chn_10'] / 1000);
var sensor11 = device.endpoints.byAddress("11").updateGenericSensorStatus(data['chn_11'] / 1000);
var sensor12 = device.endpoints.byAddress("12").updateGenericSensorStatus(data['chn_12'] / 1000);
var sensor13 = device.endpoints.byAddress("13").updateGenericSensorStatus(data['chn_13'] / 1000);
var sensor14 = device.endpoints.byAddress("14").updateGenericSensorStatus(data['chn_14'] / 1000);
var sensor15 = device.endpoints.byAddress("15").updateGenericSensorStatus(data['chn_15'] / 1000);
var sensor16 = device.endpoints.byAddress("16").updateGenericSensorStatus(data['chn_16'] / 1000);
}

function buildDownlink(device, endpoint, command, payload) 
{ 
	// This function allows you to convert a command from the platform 
	// into a payload to be sent to the device.
	// Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device to which the command will
	//   be sent. 
	// - endpoint: endpoint object representing the endpoint to which the 
	//   command will be sent. May be null if the command is to be sent to 
	//   the device, and not to an individual endpoint within the device.
	// - command: object containing the command that needs to be sent. More
	//   information at https://wiki.cloud.studio/page/1195.

	// This example is written assuming a device that contains a single endpoint, 
	// of type appliance, that can be turned on, off, and toggled. 
	// It is assumed that a single byte must be sent in the payload, 
	// which indicates the type of operation.

/*
	 payload.port = 25; 	 	 // This device receives commands on LoRaWAN port 25 
	 payload.buildResult = downlinkBuildResult.ok; 

	 switch (command.type) { 
	 	 case commandType.onOff: 
	 	 	 switch (command.onOff.type) { 
	 	 	 	 case onOffCommandType.turnOn: 
	 	 	 	 	 payload.setAsBytes([30]); 	 	 // Command ID 30 is "turn on" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.turnOff: 
	 	 	 	 	 payload.setAsBytes([31]); 	 	 // Command ID 31 is "turn off" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.toggle: 
	 	 	 	 	 payload.setAsBytes([32]); 	 	 // Command ID 32 is "toggle" 
	 	 	 	 	 break; 
	 	 	 	 default: 
	 	 	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	 break; 
	 	 	 } 
	 	 	 break; 
	 	 default: 
	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 break; 
	 }
*/

}


gpio_chns = [0x03, 0x04];
adc_chns = [0x05, 0x06];
adc_alarm_chns = [0x85, 0x86];

function milesightDeviceDecode(bytes) {
    var decoded = {};

    for (i = 0; i < bytes.length; ) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];

        // BATTERY
        if (channel_id === 0x01 && channel_type === 0x75) {
            decoded.battery = bytes[i];
            i += 1;
        }
        // GPIO (GPIO as Digital Input or Output)
        else if (includes(gpio_chns, channel_id) && (channel_type === 0x00 || channel_type === 0x01)) {
            var gpio_channel_name = "gpio_" + (channel_id - gpio_chns[0] + 1);
            decoded[gpio_channel_name] = bytes[i] === 0 ? "low" : "high";
            i += 1;
        }
        //  GPIO (GPIO as PULSE COUNTER)
        else if (includes(gpio_chns, channel_id) && channel_type === 0xc8) {
            var gpio_channel_name = "counter_" + (channel_id - gpio_chns[0] + 1);
            decoded[gpio_channel_name] = readUInt32LE(bytes.slice(i, i + 4));
            i += 4;
        }
        // ANALOG INPUT TYPE
        else if (channel_id === 0xff && channel_type === 0x14) {
            var channel = bytes[i];
            var chn_name = "adc_" + (channel >>> 4) + "_type";
            var chn_value = (channel & 0x0f) === 0 ? "current" : "voltage";
            decoded[chn_name] = chn_value;
            i += 1;
        }
        // ADC (UC50x v2)
        // firmware version 1.10 and below and UC50x V1, change 1000 to 100.
        else if (includes(adc_chns, channel_id) && channel_type === 0x02) {
            var adc_channel_name = "adc_" + (channel_id - adc_chns[0] + 1);
            decoded[adc_channel_name] = readInt16LE(bytes.slice(i, i + 2)) / 1000;
            decoded[adc_channel_name + "_min"] = readInt16LE(bytes.slice(i + 2, i + 4)) / 1000;
            decoded[adc_channel_name + "_max"] = readInt16LE(bytes.slice(i + 4, i + 6)) / 1000;
            decoded[adc_channel_name + "_avg"] = readInt16LE(bytes.slice(i + 6, i + 8)) / 1000;
            i += 8;
        }
        // ADC (UC50x v3)
        else if (includes(adc_chns, channel_id) && channel_type === 0xe2) {
            var adc_channel_name = "adc_" + (channel_id - adc_chns[0] + 1);
            decoded[adc_channel_name] = readFloat16LE(bytes.slice(i, i + 2));
            decoded[adc_channel_name + "_min"] = readFloat16LE(bytes.slice(i + 2, i + 4));
            decoded[adc_channel_name + "_max"] = readFloat16LE(bytes.slice(i + 4, i + 6));
            decoded[adc_channel_name + "_avg"] = readFloat16LE(bytes.slice(i + 6, i + 8));
            i += 8;
        }
        // SDI-12
        else if (channel_id === 0x08 && channel_type === 0xdb) {
            var name = "sdi12_" + (bytes[i++] + 1);
            decoded[name] = readString(bytes.slice(i, i + 36));
            i += 36;
        }
        // MODBUS
        else if ((channel_id === 0xff || channel_id === 0x80) && channel_type === 0x0e) {
            var modbus_chn_id = bytes[i++] - 6;
            var package_type = bytes[i++];
            var data_type = package_type & 0x07; // 0x07 = 0b00000111
            var date_length = package_type >> 3;
            var chn = "chn_" + modbus_chn_id;
            switch (data_type) {
                case 0:
                    decoded[chn] = bytes[i] ? "on" : "off";
                    i += 1;
                    break;
                case 1:
                    decoded[chn] = bytes[i];
                    i += 1;
                    break;
                case 2:
                case 3:
                    decoded[chn] = readUInt16LE(bytes.slice(i, i + 2));
                    i += 2;
                    break;
                case 4:
                case 6:
                    decoded[chn] = readUInt32LE(bytes.slice(i, i + 4));
                    i += 4;
                    break;
                case 5:
                case 7:
                    decoded[chn] = readFloatLE(bytes.slice(i, i + 4));
                    i += 4;
                    break;
            }

            if (channel_id === 0x80) {
                decoded[chn + "_alarm"] = readAlarm(bytes[i++]);
            }
        }
        // MODBUS READ ERROR
        else if (channel_id === 0xff && channel_type === 0x15) {
            var modbus_error_chn_id = bytes[i] - 6;
            var channel_name = "modbus_chn_" + modbus_error_chn_id;
            decoded[channel_name + "_alarm"] = "read error";
            i += 1;
        }
        // ADC alert (UC50x v3)
        else if (includes(adc_alarm_chns, channel_id) && channel_type === 0xe2) {
            var adc_channel_name = "adc_" + (channel_id - adc_alarm_chns[0] + 1);
            decoded[adc_channel_name] = readFloat16LE(bytes.slice(i, i + 2));
            decoded[adc_channel_name + "_min"] = readFloat16LE(bytes.slice(i + 2, i + 4));
            decoded[adc_channel_name + "_max"] = readFloat16LE(bytes.slice(i + 4, i + 6));
            decoded[adc_channel_name + "_avg"] = readFloat16LE(bytes.slice(i + 6, i + 8));
            i += 8;

            decoded[adc_channel_name + "_alarm"] = readAlarm(bytes[i++]);
        }
        // HISTORY DATA (GPIO / ADC)
        else if (channel_id === 0x20 && channel_type === 0xdc) {
            var timestamp = readUInt32LE(bytes.slice(i, i + 4));

            var data = { timestamp: timestamp };
            data.gpio_1 = readUInt32LE(bytes.slice(i + 5, i + 9));
            data.gpio_2 = readUInt32LE(bytes.slice(i + 10, i + 14));
            data.adc_1 = readInt32LE(bytes.slice(i + 14, i + 18)) / 1000;
            data.adc_2 = readInt32LE(bytes.slice(i + 18, i + 22)) / 1000;
            i += 22;

            decoded.history = decoded.history || [];
            decoded.history.push(data);
        }
        // HISTORY DATA (SDI-12)
        else if (channel_id === 0x20 && channel_type === 0xe0) {
            var timestamp = readUInt32LE(bytes.slice(i, i + 4));
            var channel_mask = numToBits(readUInt16LE(bytes.slice(i + 4, i + 6)), 16);
            i += 6;

            var data = { timestamp: timestamp };
            for (j = 0; j < channel_mask.length; j++) {
                // skip if channel is not enabled
                if (channel_mask[j] === 0) continue;
                var name = "sdi12_" + (j + 1);
                data[name] = readString(bytes.slice(i, i + 36));
                i += 36;
            }

            decoded.history = decoded.history || [];
            decoded.history.push(data);
        }
        // HISTORY DATA (MODBUS)
        else if (channel_id === 0x20 && channel_type === 0xdd) {
            decoded.history = decoded.history || [];

            var timestamp = readUInt32LE(bytes.slice(i, i + 4));
            var channel_mask = numToBits(readUInt16LE(bytes.slice(i + 4, i + 6)), 16);
            i += 6;

            var data = { timestamp: timestamp };
            for (j = 0; j < channel_mask.length; j++) {
                // skip if channel is not enabled
                if (channel_mask[j] === 0) continue;

                var name = "modbus_chn_" + (j + 1);
                var type = bytes[i++] & 0x07; // 0x07 = 0b00000111
                // 5 MB_REG_HOLD_FLOAT, 7 MB_REG_INPUT_FLOAT
                if (type === 5 || type === 7) {
                    data[name] = readFloatLE(bytes.slice(i, i + 4));
                } else {
                    data[name] = readUInt32LE(bytes.slice(i, i + 4));
                }

                i += 4;
            }

            decoded.history = decoded.history || [];
            decoded.history.push(data);
        } else {
            break;
        }
    }

    return decoded;
}

/* ******************************************
 * bytes to number
 ********************************************/
function numToBits(num, bit_count) {
    var bits = [];
    for (var i = 0; i < bit_count; i++) {
        bits.push((num >> i) & 1);
    }
    return bits;
}

function readUInt8(bytes) {
    return bytes & 0xff;
}

function readInt8(bytes) {
    var ref = readUInt8(bytes);
    return ref > 0x7f ? ref - 0x100 : ref;
}

function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return value & 0xffff;
}

function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes);
    return ref > 0x7fff ? ref - 0x10000 : ref;
}

function readUInt32LE(bytes) {
    var value = (bytes[3] << 24) + (bytes[2] << 16) + (bytes[1] << 8) + bytes[0];
    return value & 0xffffffff;
}

function readInt32LE(bytes) {
    var ref = readUInt32LE(bytes);
    return ref > 0x7fffffff ? ref - 0x100000000 : ref;
}

function readFloat16LE(bytes) {
    var bits = (bytes[1] << 8) | bytes[0];
    var sign = bits >>> 15 === 0 ? 1.0 : -1.0;
    var e = (bits >>> 10) & 0x1f;
    var m = e === 0 ? (bits & 0x3ff) << 1 : (bits & 0x3ff) | 0x400;
    var f = sign * m * Math.pow(2, e - 25);
    return f;
}

function readFloatLE(bytes) {
    var bits = (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
    var sign = bits >>> 31 === 0 ? 1.0 : -1.0;
    var e = (bits >>> 23) & 0xff;
    var m = e === 0 ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
    var f = sign * m * Math.pow(2, e - 150);
    return f;
}

function readString(bytes) {
    var str = "";
    for (var i = 0; i < bytes.length; i++) {
        if (bytes[i] === 0) {
            break;
        }
        str += String.fromCharCode(bytes[i]);
    }
    return str;
}

function includes(datas, value) {
    var size = datas.length;
    for (var i = 0; i < size; i++) {
        if (datas[i] == value) {
            return true;
        }
    }
    return false;
}

function readAlarm(type) {
    switch (type) {
        case 1:
            return "threshold alarm";
        case 2:
            return "value change alarm";
        default:
            return "unknown";
    }
}