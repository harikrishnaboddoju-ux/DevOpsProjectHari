package com.example.pipeline;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class AppTest {
    @Test
    public void testGetStatus() {
        App app = new App();
        assertEquals("Systems Online", app.getStatus(), "Status should be 'Systems Online'");
    }
}
