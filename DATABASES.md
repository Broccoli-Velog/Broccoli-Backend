## MySQL 외부 접속 설정
1. 허용 IP 설정
- `GRANT ALL PRIVILEGES ON *.* TO "계정"@"%" IDENTIFIED BY "비밀번호"`  
2. IP 대역 변경 
- `vi /etc/mysql/mysql.conf.d/mysqld.cnf` mysqld.conf 파일 수정    
- bind-address 주석 OR 0.0.0.0  
3. 서비스 재시작 후 저장
`service mysql restart`    
`flush privileges`  
  
#### MySQL 실행
`mysql -u root 계정 -p 비밀번호`  
#### 루트 계정 비밀번호 변경
- `ALTER USER 'root'@'localhost' IDENTIFIED WITH MYSQL_NATIVE_PASSWORD '비밀번호'`;  

