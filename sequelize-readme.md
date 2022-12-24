## 생성

```sql
insert into nodejs.users (name, age, married, comment) values ('zero', 24, 0, '자기소개');
```

```javascript
const { User } = require('../models');
User.create({
    name: 'zero',
    age: 24,
    married: false,
    comment: '자기소개1',
});
```

```sql
select name, married from nodejs.users;
```

```javascript
User.findAll({
attributes: ['name', 'mariied'],
});
```
## 특수한 기능들인 경우 `Sequlize.Op` 의 연산자 사용 (gt, or 등)
```sql
select name, age from nodejs.users where married = 1 and age > 30;
```
```javascript
const { Op } = require('sequelize');
const { User } = require('../models');
User.findAll({
    attributes: ['name', 'age'],
    where: {
        married: true,
        age: { [Op.gt,]: 30},
    },
});
```
```sql
select id, name from users where married = 0 OR age > 30;
```

```javascript
const { Op } = require('sequelize');
const { User } = require('../models');
User.findAll({
    attributes: ['id', 'name'],
    where: {
        [Op.or,]: [{ married: 0 }, { age: { [Op.gt,]: 30 } }],
    },
});
```

## 윗 줄이 SQL 문 , 아랫 줄은 시퀄라이즈 쿼리 (자바 스크립트)
```sql
select id, name from order by age desc;
```

```javascript
User.findAll({
attributes: ['id', 'name'],
order: [['age', 'DESC'],],
});
```

```sql
select id, name from order by age desc limit 1;
```

```javascript
User.findAll({
attributes: ['id', 'name'],
order: [['age', 'DESC'],],
limit: 1,
});
```

```sql
select id, name from order by age desc; limit 1 offset 1;
```

```javascript
User.findAll({
attributes: ['id', 'name'],
order: [['age', 'DESC'],],
limit: 1,
offset: 1,
});
```

## 수정
```sql
update nodejs.users set comment = '바꿀 내용' where id = 2;
```

```javascript
User.update({
    comment: '바꿀 내용',
}, {
    where: { id: 2,}
});
```

## 삭제
```sql
delete from nodejs.users where id = 2;
```

```javascript
User.destory({
    where: { id: 2 },
})
```