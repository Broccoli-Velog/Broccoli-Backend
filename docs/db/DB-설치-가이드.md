[< 돌아가기](./README.md)

### DB 설치 가이드

- 최종 업데이트 : `2022-08-05`

본 문서는 DB 사용 간에, 일치되는 버전 사용을 위해서 작성 되었습니다.

MySQL 설치를 위해서 [MySQL Community @8.0.30](https://dev.mysql.com/downloads/installer/) 를 사용하였습니다.

설치 항목 선택 시에는 다음 항목은 **필수** 로 선택해주세요.

1. MySQL Server
2. MySQL Workbench

> 참고로,<br>
> 설치 후 완료 버튼을 누르기 전에 `MySQL 자동 실행` 을 꼭 해제해주세요.<br>
>
> 이를 해제한 후에는 `윈도우 + R` 키를 누르고 `services.msc` 를 입력해서 서비스 항목에서 MySQL server 를 찾아서 수동으로 키시면 됩니다.
>
> 혹은, MySQL Workbench 를 통해서 DB 를 접속하시면 자동으로 서비스가 실행됩니다.