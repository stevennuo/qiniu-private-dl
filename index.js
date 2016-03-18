const MAX_VALID = 8 * 60 * 60; // 8 hour

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const qiniu = require('qiniu');
qiniu.conf.ACCESS_KEY = "Ap-_6XBBOas4n-w-osaYig82pVft-v63Rdu_2lPV";
qiniu.conf.SECRET_KEY = "_GjKAqSVaeTlWv-YF8fu2sbQJUKpApG_tu7WRgS3";
const policy = new qiniu.rs.GetPolicy(MAX_VALID);

const app = koa();
app.use(bodyParser());

const validCheck = function(valid){
    valid = (parseInt(valid) || MAX_VALID) * 60;
    if(valid > MAX_VALID) valid = MAX_VALID;
    return parseInt(Date.now() / 1000 + valid);
}

app.use(function *() {
    // 暂时统一有效时间为固定时间
    //const valid = validCheck(this.request.body.valid)

    this.body = {
        url: policy.makeRequest(this.request.body.url)
    }
});
app.listen(3333)