package com.actoviq.survey.model;

import java.util.List;

public record AnalyticsSnapshot(
        int responseCount,
        double completionRate,
        double sentimentScore,
        List<ThemeShare> topThemes
) {
}
