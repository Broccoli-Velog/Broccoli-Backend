# 브런치 전략

<img src="./FLOW-BRANCHES.png" style="width: 800px" />

| 이름 | 목적 |
| :--- | :--- |
| main | PR 을 인식해서 자동으로 `배포 작업` 진행 |
| submain | PR 후 통합 테스트 진행 |
| test/작업자명 | PR 후 단위 테스트 진행 |
| dev/작업자명 | 개발용 브런치 |