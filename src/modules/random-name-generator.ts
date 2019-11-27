const adjs = [
  '재밌는',
  '즐거운',
  '은밀한',
  '차가운',
  '물마시는',
  '냄새나는',
  '용맹한',
  '빠른',
  '답답한',
  '더운',
  '시원한',
  '멋진',
  '아름다운',
  '쌩쌩한',
  '웃는',
  '행복한',
  '건방진',
  '고민하는',
  '눈치없는',
  '교활한',
  '춤추는',
  '희망찬',
  '역겨운',
  '난해한',
  '집요한',
  '사랑스러운',
  '암울한',
  '무능한',
  '유능한',
  '근본적인',
  '새로운',
  '오래된',
  '깨끗한',
  '부유한',
  '귀여운',
  '등교하는',
  '하교하는',
  '출근하는',
  '퇴근하는',
  '달콤한',
  '영석한',
  '강한',
  '투박한',
  '예민한',
  '촉이좋은',
  '나른한',
  '귀가하는',
  '음주',
  '털털한',
  '노곤한',
  '역대급',
  '세계최고',
  '짜릿한',
  '느린',
  '오래된',
  '외로운',
  '핫한',
  '두려워하는',
  '당당한',
  '고급스러운',
  '세련된',
  '한스러운',
  '성급한',
  '고장난',
  '미세한',
  '통통한',
  '내가바로',
  '저렴한',
  '매운',
  '맛있는',
  '지독한',
  '잘생긴',
  '헤엄치는',
  '따뜻한',
  '조급한',
  '우수한',
  '대박',
  '지상최대',
  '고민하는',
  '파릇파릇한',
  '어마어마한',
  '쉬운',
  '어려운',
  '사악한',
  '고마운',
  '그리운',
  '기다란',
  '날카로운',
  '낮은',
  '네모난',
  '느닷없는',
  '반가운',
  '밝은',
  '비싼',
  '섣부른',
  '무거운',
  '소문난',
  '언짢은',
  '안타까운',
  '케케묵은',
  '힘겨운',
  '쓰디쓴',
  '쌀쌀맞은',
  '때늦은',
  '높은',
  '난데없는',
  '보람찬',
  '거친',
  '익은',
  '가파른',
  '의심쩍은',
  '한결같은',
  '턱없는',
  '질긴',
  '어설픈',
  '막막한',
  '갑자기 분위기',
  '갑작스런',
  '헐렁한',
  '호들갑 떠는',
  '마침내',
  '따가운',
  '뜨거운',
  '아쉬운',
  '뾰족한',
  '열린',
  '닫힌',
  '가벼운',
  '수상한',
  '아픈',
  '감기걸린',
  '정의로운',
  '창의적인',
  '누구나 알기 쉬운',
  '잃어버린',
  '대가를 치르는',
  '수줍어하는',
  '마땅한',
  '떨어지는',
  '날아가는',
  '능청스러운',
  '방전된',
  '무시무시한',
  '막다른',
  '피곤한',
  '저주받은',
  '축복받은',
  '부족한',
  '풍족한',
  '출출한',
  '아리따운',
  '말도 안되는',
  '불리한',
  '유리한',
  '외딴',
  '쓸쓸한',
  '마법의',
  '살벌한',
  '역시',
  '뜨끈한',
  '말린',
  '세계최초',
  '부서진',
  '씁쓸한',
  '하나밖에 없는',
  '어쩌다',
  '하염없는',
  '뒤집어진',
  '의미없는',
  '둘이 먹다 하나 죽어도 모르는',
  '혁신적인',
  '감미로운',
  '지혜로운',
  '현명한',
  '사라진',
  '보이지 않는',
  '반듯한',
  '무너진'
]

const nouns = [
  '310관',
  '사각지대',
  '사물놀이',
  '베이커리',
  '약국',
  '떡볶이',
  '목소리',
  '달구지',
  '토끼',
  '아스팔트',
  '기다림',
  '월요일',
  '가격표',
  '오징어',
  '황금마차',
  '삼다수',
  '접시',
  '이력서',
  '추천서',
  '카레',
  '파도',
  '복숭아',
  '망고',
  '국밥',
  '마포대교',
  '호랑나비',
  '옷장',
  '계단',
  '콧구멍',
  '눈썹',
  '통장',
  '충전기',
  '핸드크림',
  '에어팟',
  '동전지갑',
  '녀석들',
  '돈가스',
  '주머니',
  '골목',
  '손바닥',
  '발바닥',
  '보조배터리',
  '육개장',
  '운동장',
  '장난감',
  '축구공',
  '농구공',
  '자본주의',
  '단추',
  '손오공',
  '저팔계',
  '나그네',
  '사랑꾼',
  '빗자루',
  '안경닦이',
  '체크카드',
  '홈플러스',
  '유니콘',
  '입구',
  '지갑',
  '운전면허증',
  '주민등록증',
  '솥뚜껑',
  '태양계',
  '큰족제비고사리',
  '탄화수소',
  '큰대감마님',
  '크림타타르족',
  '크낙새',
  '링거액',
  '마늘쪽',
  '마법',
  '라장조',
  '만물박사',
  '마파두부',
  '다세포',
  '다래끼',
  '다듬잇방망이',
  '흥부',
  '놀부',
  '흑연',
  '흑백사진',
  '흡혈귀',
  '다이너마이트',
  '폭탄',
  '흡연실',
  '미소년',
  '미용실',
  '미지수',
  '미립자',
  '미끄럼틀',
  '웹툰',
  '영화',
  '가죽나무',
  '고무줄',
  '가격',
  '오리배',
  '마네킹',
  '마법사',
  '스토리',
  '중앙대',
  '청룡',
  '홍시',
  '귤',
  '제주도',
  '섬',
  '발걸음',
  '테니스',
  '감',
  '로또',
  '언덕',
  '색종이',
  '셔츠',
  '빌딩',
  '대들보',
  '시험문제',
  '맛집',
  '선택',
  '막대',
  '친구',
  '판단',
  '우체국',
  '경찰',
  '도둑',
  '중국어',
  '한국어',
  '성능',
  '새싹',
  '유산균',
  '세균',
  '치약',
  '필름',
  '하숙집',
  '사자',
  '고양이',
  '냥냥이',
  '댕댕이',
  '강아지',
  '맥북프로',
  '어디로',
  '아파트',
  '그림자',
  '돼지',
  '아이폰',
  '학생',
  '책상',
  '연필',
  '수박',
  '스파이더맨',
  '아이언맨',
  '헐크',
  '뿡뿡이',
  '자동차',
  '고등학생',
  '물병',
  '스킨로션',
  '모니터',
  '마우스',
  '지구',
  '인어공주',
  '피터팬',
  '쥐',
  '페이스북',
  '애플',
  '구글',
  '오후',
  '화장실',
  '칫솔',
  '신발',
  '갈치',
  '소시지',
  '수프',
  '마스터',
  '오랑우탄',
  '자본주의',
  '일반화학',
  '디자인',
  '크림',
  '수돗물',
  '한강',
  '수능',
  '가위',
  '크리스마스',
  '고구마',
  '감자',
  '옥수수',
  '아이패드',
  '헤드폰',
  '배트맨',
  '플랑크톤',
  '휴지통',
  '달팽이',
  '마이크로소프트',
  '부드러움',
  '마케팅',
  '수세미',
  '알약',
  '딱풀',
  '계산기',
  '컴퓨터',
  '영어책',
  '교과서',
  '마늘',
  '추어탕',
  '전원버튼',
  '스프링',
  '샤프심',
  '시계',
  '오토바이',
  '사기꾼',
  '신용카드',
  '휴지',
  '신문지',
  '바지',
  '지팡이',
  '곰팡이',
  '솜방망이'
]

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function(): string {
  const adjIndex = getRandomInt(0, adjs.length - 1)
  const nounIndex = getRandomInt(0, nouns.length - 1)

  return `${adjs[adjIndex]} ${nouns[nounIndex]}`
}
