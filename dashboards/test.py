CREATE TABLE products (
    data JSON,
         CONSTRAINT validate_id CHECK ((data->>'id')::integer >= 1 AND (data->>'id') IS NOT NULL ),
CONSTRAINT validate_name CHECK (length(data->>'name') > 0 AND (data->>'name') IS NOT NULL ),
CONSTRAINT validate_description CHECK (length(data->>'description') > 0  AND (data->>'description') IS NOT NULL ),
CONSTRAINT validate_price CHECK ((data->>'price')::decimal >= 0.0 AND (data->>'price') IS NOT NULL),
CONSTRAINT validate_currency CHECK (data->>'currency' = 'dollars' AND (data->>'currency') IS NOT NULL),
CONSTRAINT validate_in_stock CHECK ((data->>'in_stock')::integer >= 0 AND (data->>'in_stock') IS NOT NULL )
}


