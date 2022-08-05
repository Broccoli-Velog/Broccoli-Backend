[< 돌아가기](./README.md)

### DB 테이블 셋팅 및 리셋 가이드

- 최종 업데이트 : `2022-08-05`

본 문서는 `SQL Script` 파일과 `MySQL Workbench` 를 사용해서 효과적으로 DB 를 초기화하는 방법을 담고 있습니다.

1. MySQL Workbench 를 실행한다.
2. [File] - [Open-Script] 를 누른다.
3. 프로젝트 루트 경로의 [`defualt.sql`](../../sql/default.sql) 파일 을 연다.
4. `Ctrl + A` 후 `Ctrl + Shift + Enter` 를 입력해서 모든 코드가 순차 실행 되도록 한다.

> 주의사항, <br>
> 해당 방법을 사용하면 기존의 모든 데이터가 소멸하게 됩니다.