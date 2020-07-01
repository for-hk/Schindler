'use strict';
var pg = require('pg')

module.exports.query = async event => {
  const query = JSON.parse(event.body)

  const { Client } = require('pg')
  const client = new Client({
    user: 'postgres',
    host: 'licensed-sponsors-uk-proxy.proxy-cuzatsqjadia.ap-northeast-1.rds.amazonaws.com',
    database: '--',
    password: '--',
    port: 5432,
  })

  await client.connect()
  // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  if (res.rows.length > 0) {
    console.log(res.rows[0].name)
    console.log(res.rows[0].city)
    console.log(res.rows[0].tier_and_rating)
    console.log(res.rows[0].sub_tier)
  }
  const res = await client.query('SELECT "company-name" as name, city, "tier-and-rating" as tier_and_rating, "sub-tier" as sub_tier, create_at FROM "find-job"."licensed-sponsors" where "company-name-lowcase" Like $1::text limit 10;', ['%' + query.name.toLowerCase() + '%'])
  await client.end()
  if (res.rows.length > 0) {
    console.log(res.rows[0].name)
    console.log(res.rows[0].city)
    console.log(res.rows[0].tier_and_rating)
    console.log(res.rows[0].sub_tier)
  }
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        result: res.rows,
        name: query.name,
        message: 'Load successfully!',
        // input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
