BEGIN;
    CREATE TABLE public.allo_transaction (
        hash character varying NOT NULL, 
        chain_id character varying NOT NULL, 
        nonce bigint, 
        transaction_index bigint, 
        from_address character varying, 
        to_address character varying, 
        contract_address character varying, 
        value character varying, 
        input character varying, 
        function_name character varying, 
        function_args json, 
        transaction_type bigint, 
        status bigint,
        root character varying, 
        gas character varying, 
        gas_price character varying,
        max_fee_per_gas character varying,
        max_priority_fee_per_gas character varying, 
        gas_used character varying, 
        cumulative_gas_used character varying, 
        effective_gas_price character varying, 
        block_hash character varying, 
        block_number bigint, 
        block_timestamp timestamptz
    );
    COMMENT ON TABLE public.allo_transaction IS 'Transactions on Allo';
    ALTER TABLE public.allo_transaction ADD CONSTRAINT pk_mjdlgpgmtyraqdut2hbdja PRIMARY KEY (hash, chain_id);
    CREATE INDEX idx_fbxw5kq6chszayasbbs4bp ON public.allo_transaction(from_address, chain_id);
    CREATE INDEX idx_qtwy9m8zd8ubqgstawayar ON public.allo_transaction(to_address, chain_id);
    CREATE INDEX idx_4sdeza2mzgrhxdhv273me5 ON public.allo_transaction(function_name);
COMMIT;