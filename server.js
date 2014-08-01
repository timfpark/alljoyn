var config = require('./config')
  , nitrogen = require('nitrogen');

var service = new nitrogen.Service(config);

var interfaceDeviceModuleMappings = {
    'org.alljoyn.light': {
        'device': 'nitrogen-alljoyn-light',
        'manager': 'nitrogen-light'
    }
};

function connectInterfaces(interfaces, callback) {
    Object.keys(interfaces).forEach(function(interface) {

        findDevicesWithInterface(interface, function(err, deviceAllJoynIds) {
            if (err) return callback(err);

            async.concat(deviceAllJoynIds, function(deviceAllJoynId, callback) {
                connectDevice(interfaces[interface].device, deviceAllJoynId, function(err, session, device) {
                    return callback(err, [ {
                        device: device,
                        session: session
                    } ]);
                });
            }, function(err, connectedDevices) {
                if (err) return callback(err);

                async.each(connectedDevices, function(connectedDevice, deviceCallback) {
                    var CommandManager = require(interfaces[interface].manager);

                    var manager = new CommandManager(connectedDevice.device);
                    manager.start(connectedDevice.session, null, deviceCallback);
                }, callback);
            });
        });

    });
}

function sessionForDevice(deviceModule, deviceAllJoynId, callback) {
    var DeviceClass = require(deviceModule);

    var device = new DeviceClass({
        name: deviceAllJoynId,
        nickname: deviceAllJoynId
    });

    service.connect(device, callback);
}

connectInterfaces(interfaceDeviceModuleMappings);