//Edit Distance (The Levenshtein Distance) | DP-5
//Navie recursive approach O(3^m)
function editDist(str1, str2, m, n) {
  // If first string is empty, the only option is to
  // insert all characters of second string into first
  if (m === 0) return n;

  // If second string is empty, the only option is to
  // remove all characters of first string
  if (n === 0) return m;

  // If last characters of two strings are same, nothing
  // much to do. Ignore last characters and get count for
  // remaining strings.
  if (str1[m - 1] === str2[n - 1]) return editDist(str1, str2, m - 1, n - 1);

  return (
    1 +
    Math.min(
      editDist(str1, str2, m, n - 1), // Insert
      editDist(str1, str2, m - 1, n), // Remove
      editDist(str1, str2, m - 1, n - 1) // Replace
    )
  );
}

//Dynamic Approach
function editDistDP(str1, str2, m, n) {
  // Create a table to store results of subproblems
  // let dp = matrix(m + 1, n + 1, 0);
  let dp = Array(m + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(0));

  // Fill d[][] in bottom up manner
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      // If first string is empty, only option is to
      // insert all characters of second string
      if (i === 0) dp[i][j] = j;
      // Min. operations = j
      // If second string is empty, only option is to
      // remove all characters of second string
      else if (j === 0) dp[i][j] = i;
      // Min. operations = i
      // If last characters are same, ignore last char
      // and recur for remaining string
      else if (str1.charAt(i - 1) === str2.charAt(j - 1))
        dp[i][j] = dp[i - 1][j - 1];
      // If the last character is different, consider all
      // possibilities and find the minimum
      else
        dp[i][j] =
          1 +
          Math.min(
            dp[i][j - 1], // Insert
            dp[i - 1][j], // Remove
            dp[i - 1][j - 1]
          ); // Replace
    }
  }
  return dp[m][n];
}

let str1 = "sunday";
let str2 = "saturday";
console.log(editDistDP(str1, str2, str1.length, str2.length));
