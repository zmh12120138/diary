exports.mysql = {
    host: '560c88aa247bb.sh.cdb.myqcloud.com',
    port: 15286,
    database: 'diary',
    user: 'cdb_outerroot',
    password: 'llywan1314'
};

exports.redis = {
    port: '6379',
    host: 'localhost',
    options: {connect_timeout: 1}
};

exports.mailOptions = {
    service: 'QQ',
    auth_user: '1805377859@qq.com',
    auth_pass: 'nlvhejqymekwcded',

    from: 'node server <1805377859@qq.com>',  //'<>'中的地址应该与auth_user中的地址一致!
    to: '503035535@qq.com',
    subject: '韵韵来啦~'
};
