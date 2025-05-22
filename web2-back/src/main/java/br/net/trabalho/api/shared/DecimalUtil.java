package br.net.trabalho.api.shared;

import java.math.BigDecimal;

public class DecimalUtil {
    public static double formatDecimal(double value) {
        BigDecimal decimal = new BigDecimal(value);
        BigDecimal formattedDecimal = decimal.setScale(2, BigDecimal.ROUND_HALF_UP);
        return formattedDecimal.doubleValue();
    }
}
