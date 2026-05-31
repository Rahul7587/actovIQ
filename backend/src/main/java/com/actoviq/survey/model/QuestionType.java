package com.actoviq.survey.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum QuestionType {
    RATING("rating"),
    SINGLE_CHOICE("singleChoice"),
    MULTI_CHOICE("multiChoice"),
    TEXT("text");

    private final String jsonName;

    QuestionType(String jsonName) {
        this.jsonName = jsonName;
    }

    @JsonValue
    public String getJsonName() {
        return jsonName;
    }
}
