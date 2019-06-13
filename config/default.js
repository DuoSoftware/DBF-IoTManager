module.exports = {


    "Redis": {
        "mode": "instance",//instance, cluster, sentinel
        "ip": "35.226.113.17",
        "port": 6379,
        "user": "duo",
        "password": "DuoS123",
        //"redisDB": 8,
        "sentinels": {
            "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
            "port": 16389,
            "name": "redis-cluster"
        }

    },


    "Security": {

        "ip": "35.226.113.17",
        "port": 6379,
        "user": "duo",
        "password": "DuoS123",
        "mode": "instance",//instance, cluster, sentinel
        "sentinels": {
            "hosts": "138.197.90.92,45.55.205.92,138.197.90.92",
            "port": 16389,
            "name": "redis-cluster"
        }
    },

    "Host": {
        "resource": "cluster",
        "vdomain": "127.0.0.1",
        "domain": "127.0.0.1",
        "port": "3650",
        "version": "1.0.0.0"
    },

    "CertPath" : {
        keyPath: './home/DBF-AWSIOTSevice/certs/private.pem.key',
        certPath: './home/DBF-AWSIOTSevice/certs/pem.crt',
        caPath: './home/DBF-AWSIOTSevice/certs/root-CA.crt',
        clientId: '',
        //region: 'us-east-1',
        debug: false,
        host: ''
    }


};
