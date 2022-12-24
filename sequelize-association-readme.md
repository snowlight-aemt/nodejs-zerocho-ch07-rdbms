# 18. 관계 쿼리
## 결과값이 자바스크립트 객체
```javascript
const user = await User.findOne({});
console.log(user.nick);
```

## include 로 `JOIN` 과 비슷한 기능 수행 가능 
## 관계 있는 것 엮을 수 있음.
```javascript
const user = await User.findOne({
    include: [{
        model: Comment,
    }]
});
console.log(user.Comments); // 사용자 댓글
// Comments <-- hasMany, belongstoMany 관계
// Commends <-- `as` 로 모델명 변경 가능
```
## 다대다 모델은 다음과 같이 접근 가능 
## <중요> 방법 1 관계 모델
```javascript
db.sequelize.models.PostHashtag
```

---
---

## `get + 모델명` 으로 관계 있는 데이터 로딩 가능 
## <중요> 방법 2 관계 모델
```javascript
const user = await User.findOne({});
const comments = await user.getComments();
// getComments <-- hasMany, belongstoMany 관계
// Commends <-- `as` 로 모델명 변경 가능
console.log(comments);
```

## `as` 로 모델명 변경 가능
```javascript
// 관계를 설정할 때 as 로 등록
db.User.hasMany(db.Comment, {foreignkey: 'commenter', sourceKey: 'id', as: 'Answers'});
```

```javascript
// 쿼리할 때는
const user = await User.findOne({});
const comments = await user.getAnswers();
console.log(comments); // 사용자 댓글
```

## `include`나 관계 쿼리 메서드에도 `where` 나 `attributes`
```javascript
const user = await User.findOne({
    include: [{
        model: Comment,
        where: {
            id: 1,
        },
        attributes: ['id'],
    }]
})
// 또는 
const comments = await user.getCommets({
    where: {
        id: 1,
    },
    attributes: ['id'],
});
```

## 생성 쿼리
```javascript
const user = await user.findOne({});
const comment = await Comment.create();

await user.addComment(comment);
// 또는
await user.addCommend(comment.id);
```

## 여러 개를 추가할 때는 배열로 추가 가능
```javascript
const user = await User.findOne({});
const comment1 = await Comment.create();
const comment2 = await Comment.create();
await user.addComment([comment1, comment2]);
```

## 수정은 `set + 모델명`, 삭제는 `remove + 모델명`

---
---

# raw 쿼리
## 직접 SQL을 쓸 수 있음.
```javascript
const [result, metadata] = await sequelize.query('SELECT * FROM comments');
console.log(result);
```

