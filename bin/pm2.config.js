/**
 * Created by yuliang on 2017/12/1.
 */

module.exports = {
    apps: [{
        name: "lenovo-video-web",
        script: "./bin/www",
        instances: 0,
        instance_var: "INSTANCE_ID",
        exec_mode: "cluster_mode",
        watch: false,
        env: {
            NODE_ENV: "production",
            onCloud: "true",
        },
        env_dev: {
            NODE_ENV: "dev",
            onCloud: "true",
        },
        env_test: {
            NODE_ENV: "test",
            onCloud: "true",
        },
        env_demo: {
            NODE_ENV: "demo",
            onCloud: "true",
        }
    }]
};

