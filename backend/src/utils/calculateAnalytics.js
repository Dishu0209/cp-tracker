const calculateAnalytics = (submissions) => {
  const totalSubmission = submissions.length;
  let acceptedSubmissions = 0;
  const solvedProblems = new Map();

  for (const submission of submissions) {
    if (submission.verdict === "OK") {
      acceptedSubmissions++;

      const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;

      solvedProblems.set(problemKey, submission.problem);
    }
  }

  const tagDistribution = new Map();
  const uniqueSolvedProblems = solvedProblems.size;
  const ratingDistribution = new Map();

  for (const [problemKey, problem] of solvedProblems) {
    const rating = problem.rating ?? "Unrated";

    ratingDistribution.set(
      rating,
      (ratingDistribution.get(rating) || 0) + 1
    );

    for (const tag of problem.tags) {
      tagDistribution.set(
        tag,
        (tagDistribution.get(tag) || 0) + 1
      );
    }
  }

  const analytics = {
    totalSubmission,
    acceptedSubmissions,
    uniqueSolvedProblems,
    ratingDistribution: Object.fromEntries(ratingDistribution),
    tagDistribution: Object.fromEntries(tagDistribution),
  };

  return analytics;
};

module.exports = calculateAnalytics;