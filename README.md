# Java 문자열과 래퍼 클래스

## 1. 문자열 개요

자바에서 문자열(`String`)은 문자들의 시퀀스를 나타내며, `char` 타입(문자 하나)과는 다르게 여러 개의 문자를 다룰 수 있도록 설계되었다.

---

## 2. 문자열 생성 방법

자바에서 문자열을 생성하는 방법은 다음 두 가지가 있다.

1. **리터럴 방식**:

   ```java
   String str = "hello";
   ```

   - 문자열 리터럴은 **문자열 풀(String Pool)** 에 저장된다.
   - 동일한 문자열이 있을 경우 새로 생성하지 않고 기존 문자열의 참조값을 반환한다.

2. **new 키워드 사용**:
   ```java
   String str = new String("hello");
   ```
   - 힙(Heap) 영역에 새로운 `String` 객체를 생성하며, 동일한 값이 있어도 새로운 객체를 만든다.

---

## 3. 문자열 풀 (String Pool)

자바는 성능 최적화를 위해 **String Pool** 을 활용한다.  
리터럴 방식으로 문자열을 선언하면 같은 값이 존재할 경우 **새로운 객체를 생성하지 않고 기존 객체의 참조값을 반환** 한다.

```java
String a = "hello";
String b = "hello";

System.out.println(a == b);  // true (같은 객체를 참조)
```

반면, `new String("hello")`를 사용하면 항상 새로운 객체가 생성된다.

```java
String a = new String("hello");
String b = new String("hello");

System.out.println(a == b);  // false (다른 객체)
System.out.println(a.equals(b));  // true (값 비교는 동일)
```

---

## 4. 문자열의 불변성 (Immutability)

자바의 `String` 클래스는 **불변(immutable) 객체**이다.  
즉, 한 번 생성된 문자열은 변경할 수 없으며, 문자열을 수정하는 모든 연산(`concat`, `replace` 등)은 **새로운 객체를 생성하여 반환**한다.

```java
String a = "hello";
String b = a.concat(" world");

System.out.println(a);  // "hello" (원본 문자열은 변하지 않음)
System.out.println(b);  // "hello world" (새로운 객체 반환)
```

**불변성의 장점**:

- **메모리 절약**: 같은 문자열은 재사용됨.
- **보안성**: 변경 불가능하므로 안전하게 공유 가능.
- **멀티스레드 안정성**: 동기화 없이 안전하게 사용 가능.

---

## 5. 문자열 연산

### 5.1 문자열 연결 (Concatenation)

```java
String a = "hello";
String b = "java";

String result1 = a.concat(b);  // concat() 메서드 사용
String result2 = a + b;        // + 연산자 사용
```

자바에서 `+` 연산자를 사용할 경우 내부적으로 `StringBuilder`를 사용하여 성능을 최적화한다.

---

## 6. StringBuilder와 StringBuffer

문자열이 불변 객체이므로, 자주 변경해야 하는 경우 `StringBuilder` 또는 `StringBuffer`를 사용하는 것이 효율적이다.

| 타입            | 특징                                  |
| --------------- | ------------------------------------- |
| `String`        | 불변 객체 (Immutable)                 |
| `StringBuilder` | 가변 객체, 동기화 X (빠름)            |
| `StringBuffer`  | 가변 객체, 동기화 O (멀티스레드 환경) |

### 6.1 `StringBuilder` 사용 예시

```java
StringBuilder sb = new StringBuilder("hello");
sb.append(" world");
System.out.println(sb);  // "hello world"
```

반복문에서 문자열을 반복해서 더해야 할 경우 `StringBuilder`를 사용하는 것이 성능상 훨씬 유리하다.

```java
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10; i++) {
    sb.append("반복 ").append(i).append("\n");
}
System.out.println(sb.toString());
```

---

## 7. 래퍼 클래스 (Wrapper Class)

기본 자료형(primitive type)은 객체가 아니므로, 객체처럼 다룰 수 있도록 **래퍼 클래스**를 제공한다.

| 기본형    | 래퍼 클래스 |
| --------- | ----------- |
| `int`     | `Integer`   |
| `char`    | `Character` |
| `double`  | `Double`    |
| `boolean` | `Boolean`   |

### 7.1 박싱(Boxing)과 언박싱(Unboxing)

자바에서는 기본형 데이터를 래퍼 객체로 변환하는 **박싱(Boxing)** 과, 반대로 객체를 기본형으로 변환하는 **언박싱(Unboxing)** 을 자동으로 수행한다.

```java
Integer num = 10;  // 오토 박싱
int value = num;   // 오토 언박싱
```

### 7.2 `Integer.valueOf()` 최적화

```java
Integer a = Integer.valueOf(100);
Integer b = Integer.valueOf(100);

System.out.println(a == b);  // true (같은 객체를 참조)
```

`Integer.valueOf()`는 **-128 ~ 127 범위의 정수를 미리 캐싱**하여 동일한 값을 재사용하도록 최적화되어 있다.

---

## 8. 정리

- `String`은 불변 객체로, 변경 시 새로운 객체를 생성함.
- 문자열 리터럴은 **String Pool**에 저장되며 같은 값이 있을 경우 기존 객체를 재사용.
- 문자열을 자주 변경해야 한다면 `StringBuilder`를 사용하는 것이 성능적으로 유리.
- 기본형을 객체처럼 다루기 위해 **래퍼 클래스**를 제공하며, 자동 박싱/언박싱 기능이 있다.
