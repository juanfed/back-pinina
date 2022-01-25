


CREATE TABLE public.t_clientes
(
    id_clientes numeric NOT NULL DEFAULT nextval('t_clientes_id_seq'::regclass),
    tipo_identificacion character varying(2) ,
    identificacion character varying(100) ,
    primer_nombre character varying(100),
    segundo_nombre character varying(100) ,
    primer_apellido character varying(100) ,
    segundo_apellido character varying(100),
	direccion  character varying(100) ,
    telefono character varying(20) ,
	correo character varying(300) ,
    password character varying(32) ,
	codigo_ubicacion_geografica_pais numeric ,
	codigo_ubicacion_geografica_departamento numeric ,
	codigo_ubicacion_geografica_ciudad numeric ,
	codigo_ubicacion_geografica_localidad numeric ,
	estado numeric  DEFAULT 1,
    CONSTRAINT cliente_pkey PRIMARY KEY (id_clientes),
    CONSTRAINT cliente_pais_fk FOREIGN KEY (codigo_ubicacion_geografica_pais )
        REFERENCES public.t_ubicaciones_geograficas (codigo_dane) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT cliente_departamento_fk FOREIGN KEY (codigo_ubicacion_geografica_departamento)
        REFERENCES public.t_ubicaciones_geograficas (codigo_dane) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT cliente_localidad_fk FOREIGN KEY (codigo_ubicacion_geografica_localidad)
        REFERENCES public.t_ubicaciones_geograficas (codigo_dane) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE t_genero_mascota
(
    genero_mascota numeric,
    tipo text ,
    CONSTRAINT t_genero_mascota_pkey PRIMARY KEY (genero_mascota)
)

CREATE TABLE public.t_colores
(
    id_color numeric NOT NULL DEFAULT nextval('t_colores_id_color_seq'::regclass),
    nombre_color text COLLATE pg_catalog."default",
    id_tipo_mascota numeric,
    CONSTRAINT t_colores_pkey PRIMARY KEY (id_color),
    CONSTRAINT t_colores_id_tipo_mascota_fk FOREIGN KEY (id_tipo_mascota)
        REFERENCES public.t_tipos_mascotas (id_tipo_mascota) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE t_tipos_mascotas
(
    id_tipo_mascota numeric NOT NULL ,
    nombre_tipo text ,
    CONSTRAINT t_tipos_mascotas_pkey PRIMARY KEY (id_tipo_mascota)
)


CREATE TABLE public.t_tamanios
(
    id_tamanio numeric NOT NULL ,
    tamanio text ,
    id_tipo_mascota numeric NOT NULL,
    CONSTRAINT t_tamanios_pkey PRIMARY KEY (id_tamanio),
    CONSTRAINT t_tamanios_id_tipo_mascota_fk FOREIGN KEY (id_tipo_mascota)
        REFERENCES public.t_tipos_mascotas (id_tipo_mascota) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)





CREATE TABLE public.t_mascotas
(
    id_mascotas serial,
    nombre_mascota text ,
    edad_mascota numeric NOT NULL,
    escala_edad numeric NOT NULL,
    esterilizado numeric,
    id_raza numeric NOT NULL,
    id_tamanio numeric,
    id_color numeric NOT NULL,
    genero_mascota numeric,
    descripcion_mascota text ,
    id_clientes integer NOT NULL,
    CONSTRAINT mascotas_pkey PRIMARY KEY (id_mascotas),
    CONSTRAINT fk_mascotas_genero FOREIGN KEY (genero_mascota)
        REFERENCES public.t_genero_mascota (genero_mascota) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT t_mascotas_id_clientess_fk FOREIGN KEY (id_clientes)
        REFERENCES public.t_clientes (id_clientes) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT t_mascotas_id_color_fk FOREIGN KEY (id_color)
        REFERENCES public.t_colores (id_color) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT t_mascotas_id_raza_fk FOREIGN KEY (id_raza)
        REFERENCES public.t_razas (id_raza) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT t_mascotas_id_tamanio_fk FOREIGN KEY (id_tamanio)
        REFERENCES public.t_tamanios (id_tamanio) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE OR REPLACE VIEW public.v_mascotas
 AS
 SELECT m.id_mascotas,
    m.nombre_mascota,
    m.fecha_nacimiento,
    m.edad_mascota,
    m.escala_edad,
    m.esterilizado,
    m.id_raza,
    ir.nombre_raza,
    ct.id_tipo_mascota,
    ct.nombre_tipo,
    m.id_tamanio,
    it.tamanio,
    m.id_color,
    ic.nombre_color,
    m.genero_mascota,
    ig.tipo,
    m.descripcion_mascota,
    m.id_clientes,
    icl.primer_nombre as nombre_propietario,
    icl.primer_apellido as apellido_propietario
   FROM t_mascotas m,
    t_tamanios it,
    t_colores ic,
    t_genero_mascota ig,
    t_razas ir,
    t_tipos_mascotas ct,
    t_clientes icl
  WHERE m.id_raza = ir.id_raza AND m.id_tamanio = it.id_tamanio AND m.id_color = ic.id_color
  AND m.genero_mascota = ig.genero_mascota AND m.id_clientes = icl.id_clientes AND ir.id_tipo_mascota = ct.id_tipo_mascota;



CREATE TABLE public.t_fotos_mascotas
(
    id serial,
    ruta_guardado text COLLATE pg_catalog."default",
    nombre_imagen text COLLATE pg_catalog."default",
    id_mascotas numeric NOT NULL,
    consecutivo numeric NOT NULL,
    CONSTRAINT t_fotos_pkey PRIMARY KEY (id),
    CONSTRAINT t_fotos_id_mascota_fk FOREIGN KEY (id_mascotas)
        REFERENCES public.t_mascotas (id_mascotas) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)






-------------------------------------------------------------------------------------------------

CREATE TABLE public.t_tipo_examen
(
    id_tipo_examen numeric NOT NULL DEFAULT nextval('t_tipo_examen_id_tipo_examen_seq'::regclass),
    tipo_examen text COLLATE pg_catalog."default",
    CONSTRAINT tipo_examen_pkey PRIMARY KEY (id_tipo_examen)
)

CREATE OR REPLACE FUNCTION public.f_readt_examenidhidm(
	i_id_historias numeric,
	i_id_mascotas numeric)
    RETURNS SETOF t_historias_clinicas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_historias_clinicas WHERE id_historias = i_id_historias
 AND id_mascotas = i_id_mascotas;
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_readt_examenbyid(
	i_id_examen numeric)
    RETURNS SETOF t_examen
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_examen WHERE id_examen=i_id_examen;
 END;
$BODY$;

CREATE TABLE public.t_examen
(
    id_examen numeric NOT NULL DEFAULT nextval('t_examen_id_examen_seq'::regclass),
    id_tipo_examen numeric,
    descripcion text COLLATE pg_catalog."default",
    fecha_examen text COLLATE pg_catalog."default",
    resultados text COLLATE pg_catalog."default",
    CONSTRAINT examen_pkey PRIMARY KEY (id_examen),
    CONSTRAINT fk_examen_tipo FOREIGN KEY (id_tipo_examen)
        REFERENCES public.t_tipo_examen (id_tipo_examen) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)



CREATE TABLE public.t_historias_clinicas
(
    id_historias integer NOT NULL DEFAULT nextval('t_historias_clinicas_id_historias_seq'::regclass),
    fecha_grabacion text COLLATE pg_catalog."default",
    hora text COLLATE pg_catalog."default",
    profesional numeric,
    antecedentes text COLLATE pg_catalog."default",
    sintomas text COLLATE pg_catalog."default",
    observaciones text COLLATE pg_catalog."default",
    diagnostico text COLLATE pg_catalog."default",
    id_examen numeric,
    CONSTRAINT historias_pkey PRIMARY KEY (id_historias),
    CONSTRAINT fk_historias_clinicas_examen FOREIGN KEY (id_examen)
        REFERENCES public.t_examen (id_examen) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_historias_profesionales FOREIGN KEY (profesional)
        REFERENCES public.t_usuario (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)



CREATE TABLE public.t_historias_clinicas
(
    id_historias numeric NOT NULL DEFAULT nextval('t_historias_clinicas_id_historias_seq'::regclass),
    fecha_grabacion text COLLATE pg_catalog."default",
    hora text COLLATE pg_catalog."default",
    profesional numeric,
    antecedentes text COLLATE pg_catalog."default",
    sintomas text COLLATE pg_catalog."default",
    observaciones text COLLATE pg_catalog."default",
    diagnostico text COLLATE pg_catalog."default",
    id_examen numeric,
    CONSTRAINT historias_pkey PRIMARY KEY (id_historias),
    CONSTRAINT fk_historias_clinicas_examen FOREIGN KEY (id_examen)
        REFERENCES public.t_examen (id_examen) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_historias_profesionales FOREIGN KEY (profesional)
        REFERENCES public.t_usuario (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


---------------------------------

CREATE TABLE public.t_tipo_vacunas
(
    id_tipo_vacunas serial,
    tipo_vacunas text COLLATE pg_catalog."default",
    CONSTRAINT tipo_vacunas_pkey PRIMARY KEY (id_tipo_vacunas)
)


CREATE TABLE public.t_vacunas
(
    id_vacuna serial,
	id_tipo_vacuna numeric,
	fecha_vacuna text,
	dosis text,
	fecha_proxima_vacuna text,
	sintomas_vacuna text,

    CONSTRAINT historias_pkey PRIMARY KEY (id_vacuna),


	CONSTRAINT fk_vacunas_tipo FOREIGN KEY (id_tipo_vacunas)
        REFERENCES public.t_tipo_vacunas (id_tipo_vacunas) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

---------------------------------------------------------------------------

CREATE TABLE public.t_tipo_desparasitante
(
    id_tipo_desparasitante serial,
    tipo_desparasitante text ,
    CONSTRAINT tipo_tipo_desparasitante_pkey PRIMARY KEY (id_tipo_desparasitante)
)



CREATE TABLE public.t_desparasitante
(
    id_desparasitante integer NOT NULL DEFAULT nextval('t_desparasitante_id_desparasitante_seq'::regclass),
    id_tipo_desparasitante numeric,
    fecha_desparasitante text COLLATE pg_catalog."default",
    dosis text COLLATE pg_catalog."default",
    fecha_proximo_des text COLLATE pg_catalog."default",
    sintomas_desparasitante text COLLATE pg_catalog."default",
    id_mascotas numeric,
    CONSTRAINT desparasitante_pkey PRIMARY KEY (id_desparasitante),
    CONSTRAINT fk_tipo_desparasitante FOREIGN KEY (id_tipo_desparasitante)
        REFERENCES public.t_tipo_desparasitante (id_tipo_desparasitante) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT t_mascotas_id_mascotas_fk FOREIGN KEY (id_mascotas)
        REFERENCES public.t_mascotas (id_mascotas) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
-----------------------------------------------------------


CREATE TABLE public.t_hozpitalizacion
(
    id_hozpitalizacion  serial,
	tipo_hozpitalizacion text,
	hora_hoz text,
	razon_hoztext text,
	descripcion_hoz text,
	profesional numeric,
	fecha_entrada_hoz text,
	fecha_salida_hoz text,
	estado_hoz numeric,

    CONSTRAINT hozpitalizacion_pkey PRIMARY KEY (id_hozpitalizacion)

)

----------------------------------------------------------------


CREATE TABLE public.t_tipo_cita
(
    id_tipo_cita serial,
    tipo_cita text ,
    CONSTRAINT tipo_cita_pkey PRIMARY KEY (id_tipo_cita)
)



CREATE TABLE public.t_citas
(
    id_cita serial,
	fecha_cita text,
	hora_cita text,
	id_tipo_cita numeric,
	descripcion_cita text,
	paciente_cita numeric,
	propietario_cita numeric,
	profecional_cita numeric,
	estado_cita numeric,

    CONSTRAINT citas_pkey PRIMARY KEY (id_cita),

	CONSTRAINT fk_tipo_cita FOREIGN KEY (id_tipo_cita)
        REFERENCES public.t_tipo_cita (id_tipo_cita) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT fk_paciente_cita FOREIGN KEY (paciente_cita)
        REFERENCES public.t_mascotas (id_mascotas) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT fk_propietario_cita FOREIGN KEY (propietario_cita)
        REFERENCES public.t_clientes(id_clientes) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,

	CONSTRAINT fk_profecional_cita  FOREIGN KEY (profecional_cita )
        REFERENCES public.t_usuario(id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION



)

--------------------------------------------------------------------
-- FUNCTION: public.f_readclientes(numeric)

-- DROP FUNCTION public.f_readclientes(numeric);

CREATE OR REPLACE FUNCTION public.f_readclientes(
	s_id_user numeric)
    RETURNS SETOF t_clientes
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_clientes WHERE t_clientes.id_usuario = s_id_user;
 END;
$BODY$;

ALTER FUNCTION public.f_readclientes(numeric)
    OWNER TO veterinarias;






CREATE OR REPLACE FUNCTION public.f_updateclientes(
	i_id_clientes numeric,
	i_tipo_identificacion character varying,
	i_identificacion character varying,
	i_primer_nombre character varying,
	i_segundo_nombre character varying,
	i_primer_apellido character varying,
	i_segundo_apellido character varying,
	i_direccion character varying,
	i_telefono character varying,
	i_correo character varying,
	i_codigo_ubicacion_geografica_pais numeric,
	i_codigo_ubicacion_geografica_departamento numeric,
	i_codigo_ubicacion_geografica_ciudad numeric,
	i_codigo_ubicacion_geografica_localidad numeric,
	i_id_usuario numeric)
    RETURNS SETOF t_clientes
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 UPDATE t_clientes

 SET tipo_identificacion=i_tipo_identificacion,identificacion=i_identificacion,primer_nombre=i_primer_nombre,
	segundo_nombre=i_segundo_nombre, primer_apellido=i_primer_apellido, segundo_apellido=i_segundo_apellido,
	direccion=i_direccion,telefono=i_telefono,correo=i_correo,codigo_ubicacion_geografica_pais=i_codigo_ubicacion_geografica_pais,
	 codigo_ubicacion_geografica_departamento=i_codigo_ubicacion_geografica_departamento,codigo_ubicacion_geografica_ciudad=i_codigo_ubicacion_geografica_ciudad,
	codigo_ubicacion_geografica_localidad=i_codigo_ubicacion_geografica_localidad
WHERE (id_clientes=i_id_clientes and id_usuario=i_id_usuario)
	RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_updateclientes(numeric, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, numeric, numeric, numeric, numeric, numeric)
    OWNER TO veterinarias;

CREATE OR REPLACE FUNCTION public.f_updateclientesperfilmascota(
    i_id_clientes numeric,
	i_identificacion character varying,
	i_primer_nombre character varying,
    i_segundo_nombre character varying,
    i_primer_apellido character varying,
    i_segundo_apellido character varying,
	i_direccion character varying,
	i_telefono character varying,
	i_correo character varying)
    RETURNS SETOF t_clientes
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 UPDATE t_clientes

 SET primer_nombre=i_primer_nombre,segundo_nombre=i_segundo_nombre, primer_apellido=i_primer_apellido, segundo_apellido=i_segundo_apellido, identificacion = i_identificacion,
	direccion=i_direccion,telefono=i_telefono,correo=i_correo
WHERE (id_clientes=i_id_clientes)
	RETURNING *;
 END;
$BODY$;


CREATE OR REPLACE VIEW public.v_clientes
 AS
 SELECT ff.id_clientes,
    ff.tipo_identificacion,
    ff.identificacion,
    ff.primer_nombre,
    ff.segundo_nombre,
    ff.primer_apellido,
    ff.segundo_apellido,
    ff.direccion,
    ff.telefono,
    ff.correo,
    ff.password,
    ff.codigo_ubicacion_geografica_pais,
    a.descripcion AS descripcion_pais,
    ff.codigo_ubicacion_geografica_departamento,
    b.descripcion AS descripcion_departamento,
    ff.codigo_ubicacion_geografica_ciudad,
    c.descripcion AS descripcion_ciudad,
    ff.codigo_ubicacion_geografica_localidad,
    w.descripcion AS descripcion_localidad,
    ff.estado,
    ff.id_usuario,
    m.id_mascotas,
    m.nombre_mascota,
    m.fecha_nacimiento,
    m.edad_mascota,
    m.escala_edad,
    m.esterilizado,
    m.descripcion_mascota,
    m.id_clientes AS id_clientesmas,
    d.id_color,
    d.nombre_color AS color,
    e.id_raza,
    e.nombre_raza AS raza,
    e.id_tipo_mascota,
    tm.nombre_tipo,
    f.id_tamanio,
    f.tamanio,
    g.genero_mascota,
    g.tipo
   FROM t_clientes ff,
    t_mascotas m,
    t_ubicaciones_geograficas a,
    t_ubicaciones_geograficas b,
    t_ubicaciones_geograficas c,
    t_ubicaciones_geograficas w,
    t_colores d,
    t_razas e,
    t_tamanios f,
    t_tipos_mascotas tm,
    t_genero_mascota g
  WHERE ff.id_clientes = m.id_clientes AND ff.codigo_ubicacion_geografica_pais = a.codigo_dane AND ff.codigo_ubicacion_geografica_departamento = b.codigo_dane AND ff.codigo_ubicacion_geografica_ciudad = c.codigo_dane AND ff.codigo_ubicacion_geografica_localidad = w.codigo_dane AND m.id_color = d.id_color AND m.id_raza = e.id_raza AND m.id_tamanio = f.id_tamanio AND m.genero_mascota = g.genero_mascota AND e.id_tipo_mascota = tm.id_tipo_mascota;



CREATE OR REPLACE FUNCTION public.readallt_tipos_vacuna(
	)
    RETURNS SETOF t_tipo_vacunas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_tipo_vacunas;
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_readallclientes(
	)
    RETURNS SETOF t_clientes
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_clientes;
 END;
$BODY$;

ALTER FUNCTION public.f_readclientes(numeric)
    OWNER TO veterinarias;

CREATE OR REPLACE FUNCTION public.f_searcht_vacunaId(
	i_id_vacuna numeric)
    RETURNS SETOF t_vacunas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_vacunas WHERE t_vacunas.id_vacuna = i_id_vacuna;
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_searchT_clienteId(
	i_id_cliente numeric)
    RETURNS SETOF t_clientes
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_clientes WHERE t_clientes.id_clientes = i_id_cliente;
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_searchT_clientesporIdclienteYIdUsuario(
	i_id_cliente numeric, i_id_usuario numeric)
    RETURNS SETOF v_clientes
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM v_clientes WHERE v_clientes.id_clientes = i_id_cliente AND v_clientes.id_usuario = i_id_usuario;
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_readclientes(i_id_clientes numeric
	)
    RETURNS SETOF v_clientes
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM v_clientes where v_clientes.id_clientes= i_id_clientes;
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_readvacunas(i_id_mascotas numeric, i_id_clientes numeric, i_id_usuario numeric
	)
    RETURNS SETOF t_vacunas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_vacunas where t_vacunas.id_clientes= i_id_clientes AND t_vacunas.id_mascotas= i_id_mascotas AND t_vacunas.id_usuario= i_id_usuario;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_readmascotas(i_id_clientes numeric
	)
    RETURNS SETOF v_mascotas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM v_mascotas where v_mascotas.id_clientes= i_id_clientes;
 END;
$BODY$;

ALTER FUNCTION public.f_readclientes(numeric)
    OWNER TO veterinarias;


CREATE OR REPLACE FUNCTION public.f_searchT_mascotaIdporIdclienteYIdusuarioId(i_id_clientes numeric, i_id_usuario numeric
	)
    RETURNS SETOF v_fotomascotas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM v_fotomascotas where v_fotomascotas.id_clientes= i_id_clientes AND v_fotomascotas.id_usuario= i_id_usuario AND consecutivo = 1;
 END;
$BODY$;



CREATE OR REPLACE VIEW public.v_fotomascotas
 AS
 SELECT ff.id_clientes,
 ff.tipo_identificacion,
    ff.identificacion,
    ff.primer_nombre,
    ff.segundo_nombre,
    ff.primer_apellido,
    ff.segundo_apellido,
    ff.direccion,
    ff.telefono,
    ff.correo,
    ff.password,
    ff.codigo_ubicacion_geografica_pais,
    a.descripcion AS descripcion_pais,
    ff.codigo_ubicacion_geografica_departamento,
    b.descripcion AS descripcion_departamento,
    ff.codigo_ubicacion_geografica_ciudad,
    c.descripcion AS descripcion_ciudad,
    ff.codigo_ubicacion_geografica_localidad,
    w.descripcion AS descripcion_localidad,
    ff.estado,
    ff.id_usuario,
    m.id_mascotas,
    m.nombre_mascota,
    m.fecha_nacimiento,
    m.edad_mascota,
    m.escala_edad,
    m.esterilizado,
    m.descripcion_mascota,
    m.id_clientes AS id_clientesmas,
    d.id_color,
    d.nombre_color AS color,
    e.id_raza,
    e.nombre_raza AS raza,
    e.id_tipo_mascota,
    ct.nombre_tipo,
    f.id_tamanio,
    f.tamanio,
    g.genero_mascota,
    g.tipo,
    cf.id as id_foto_mascota,
    cf.consecutivo

   FROM t_clientes ff,
    t_mascotas m,
    t_ubicaciones_geograficas a,
    t_ubicaciones_geograficas b,
    t_ubicaciones_geograficas c,
    t_ubicaciones_geograficas w,
    t_colores d,
    t_razas e,
    t_tamanios f,
    t_genero_mascota g,
    t_tipos_mascotas ct,
    t_fotos_mascotas cf
  WHERE ff.id_clientes = m.id_clientes AND ff.codigo_ubicacion_geografica_pais = a.codigo_dane AND ff.codigo_ubicacion_geografica_departamento = b.codigo_dane AND ff.codigo_ubicacion_geografica_ciudad = c.codigo_dane AND ff.codigo_ubicacion_geografica_localidad = w.codigo_dane AND m.id_color = d.id_color AND m.id_raza = e.id_raza AND m.id_tamanio = f.id_tamanio AND m.genero_mascota = g.genero_mascota
 AND m.id_mascotas = cf.id_mascotas AND e.id_tipo_mascota = ct.id_tipo_mascota;


CREATE OR REPLACE FUNCTION public.f_getidfotomascotabyidmascota(
	i_id_mascotas numeric)
    RETURNS SETOF t_fotos_mascotas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
	SELECT * FROM t_fotos_mascotas where id_mascotas = i_id_mascotas AND consecutivo=1;
 END;
$BODY$;


CREATE OR REPLACE VIEW public.v_hozpitalizacion
 AS
 SELECT h.id_hozpitalizacion,
    h.tipo_hozpitalizacion,
    h.hora_hoz,
    h.razon_hoztext,
    h.descripcion_hoz,
    h.profesional,
    h.fecha_entrada_hoz,
    h.fecha_salida_hoz,
    h.estado_hoz,
    h.id_mascota,
    m.nombre_mascota,
    m.fecha_nacimiento,
    m.edad_mascota,
    m.escala_edad,
    m.esterilizado,
    m.id_raza,
    tr.nombre_raza,
    tr.id_tipo_mascota,
    tmm.nombre_tipo,
    m.id_tamanio,
    tam.tamanio,
    m.id_color,
    col.nombre_color,
    m.genero_mascota,
    gen.tipo AS tipo_genero_mascota,
    m.descripcion_mascota,
    h.id_cliente,
    cli.tipo_identificacion,
    cli.identificacion,
    cli.primer_nombre AS primer_nombre_cliente,
    cli.segundo_nombre AS segundo_nombre_cliente,
    cli.primer_apellido AS primer_apellido_cliente,
    cli.segundo_apellido AS segundo_apellido_cliente,
    cli.direccion,
    cli.telefono,
    cli.correo,
    cli.password,
    cli.codigo_ubicacion_geografica_pais,
    a.descripcion AS descripcion_pais,
    cli.codigo_ubicacion_geografica_departamento,
    b.descripcion AS descripcion_departamento,
    cli.codigo_ubicacion_geografica_ciudad,
    c.descripcion AS descripcion_ciudad,
    cli.codigo_ubicacion_geografica_localidad,
    w.descripcion AS descripcion_localidad,
    h.id_usuario,
    sv.id_signos_vitales,
    sv.tr,
    sv.temp,
    sv.pulso,
    sv.peso,
    sv.fc
   FROM t_hozpitalizacion h,
    t_mascotas m,
    t_razas tr,
    t_tipos_mascotas tmm,
    t_tamanios tam,
    t_colores col,
    t_genero_mascota gen,
    t_clientes cli,
    t_ubicaciones_geograficas a,
    t_ubicaciones_geograficas b,
    t_ubicaciones_geograficas c,
    t_ubicaciones_geograficas w,
    t_signos_vitales sv
  WHERE h.id_hozpitalizacion = sv.id_hozpitalizacion AND h.id_mascota = m.id_mascotas AND m.id_raza = tr.id_raza AND tr.id_tipo_mascota = tmm.id_tipo_mascota AND m.id_tamanio = tam.id_tamanio AND m.id_color = col.id_color AND m.genero_mascota = gen.genero_mascota AND h.id_cliente = cli.id_clientes AND cli.codigo_ubicacion_geografica_pais = a.codigo_dane AND cli.codigo_ubicacion_geografica_departamento = b.codigo_dane AND cli.codigo_ubicacion_geografica_ciudad = c.codigo_dane AND cli.codigo_ubicacion_geografica_localidad = w.codigo_dane;

CREATE OR REPLACE FUNCTION public.f_searchclientes(
	s_id_usuario numeric,
	s_dato_busqueda character varying)
    RETURNS SETOF t_clientes
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
	SELECT * FROM t_clientes
	WHERE (t_clientes.id_usuario = s_id_usuario AND t_clientes.identificacion = s_dato_busqueda)
	OR (t_clientes.id_usuario = s_id_usuario AND t_clientes.correo = s_dato_busqueda);
 END;
$BODY$;

ALTER FUNCTION public.f_searchclientes(numeric, character varying)
    OWNER TO veterinarias;

CREATE OR REPLACE FUNCTION public.f_createvacunas(
	i_id_tipo_vacunas numeric,
	i_fecha_vacuna  text,
	i_dosis  text,
	i_fecha_proxima_vacuna text,
	i_sintomas_vacuna text,
	i_id_mascotas numeric,
    i_id_clientes numeric,
	i_id_usuario numeric)
    RETURNS SETOF t_vacunas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 INSERT INTO t_vacunas(id_tipo_vacunas,
        fecha_vacuna,
        dosis,
        fecha_proxima_vacuna,
        sintomas_vacuna,
        id_mascotas,
        id_clientes,
        id_usuario)

	VALUES (i_id_tipo_vacunas,
	i_fecha_vacuna,
	i_dosis ,
	i_fecha_proxima_vacuna,
	i_sintomas_vacuna,
	i_id_mascotas,
    i_id_clientes,
	i_id_usuario)

	RETURNING *;
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_updatevacunas(
    i_id_vacuna numeric,
	i_id_tipo_vacunas numeric,
	i_fecha_vacuna  text,
	i_dosis  text,
	i_fecha_proxima_vacuna text,
	i_sintomas_vacuna text,
	i_id_mascotas numeric,
    i_id_clientes numeric,
	i_id_usuario numeric)
    RETURNS SETOF t_vacunas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 UPDATE t_vacunas

	SET id_tipo_vacunas = i_id_tipo_vacunas,
	fecha_vacuna = i_fecha_vacuna,
	dosis = i_dosis ,
	fecha_proxima_vacuna = i_fecha_proxima_vacuna,
	sintomas_vacuna = i_sintomas_vacuna
WHERE (id_vacuna = i_id_vacuna AND id_mascotas = i_id_mascotas AND id_clientes = i_id_clientes AND id_usuario = i_id_usuario )

	RETURNING *;
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_createclientes(
	i_tipo_identificacion character varying,
	i_identificacion character varying,
	i_primer_nombre character varying,
	i_segundo_nombre character varying,
	i_primer_apellido character varying,
	i_segundo_apellido character varying,
	i_direccion character varying,
	i_telefono character varying,
	i_correo character varying,
	i_codigo_ubicacion_geografica_pais numeric,
	i_codigo_ubicacion_geografica_departamento numeric,
	i_codigo_ubicacion_geografica_ciudad numeric,
	i_codigo_ubicacion_geografica_localidad numeric,
	i_estado numeric,
	i_id_usuario numeric)
    RETURNS SETOF t_clientes
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 INSERT INTO t_clientes(tipo_identificacion, identificacion, primer_nombre,
	segundo_nombre, primer_apellido, segundo_apellido, direccion, telefono, correo,
	codigo_ubicacion_geografica_pais, codigo_ubicacion_geografica_departamento,
	codigo_ubicacion_geografica_ciudad, codigo_ubicacion_geografica_localidad, estado, id_usuario)

	VALUES (i_tipo_identificacion, i_identificacion, i_primer_nombre, i_segundo_nombre,
	i_primer_apellido, i_segundo_apellido, i_direccion, i_telefono, i_correo,
	i_codigo_ubicacion_geografica_pais, i_codigo_ubicacion_geografica_departamento,
	i_codigo_ubicacion_geografica_ciudad, i_codigo_ubicacion_geografica_localidad, i_estado, i_id_usuario)

	RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_createclientes(character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying, numeric, numeric, numeric, numeric, numeric, numeric)
    OWNER TO veterinarias;


CREATE OR REPLACE FUNCTION public.f_deletevacuna(
	i_id_vacuna numeric)
    RETURNS SETOF t_vacunas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 DELETE FROM t_vacunas WHERE t_vacunas.id_vacuna = i_id_vacuna
 RETURNING *;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_deleteclientes(
	i_identificacion character varying)
    RETURNS SETOF t_clientes
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 DELETE FROM t_clientes WHERE identificacion = i_identificacion
 RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_deleteclientes(character varying)
    OWNER TO veterinarias;






CREATE OR REPLACE FUNCTION public.f_readcitas(
	i_profecional_cita numeric)
    RETURNS SETOF v_citas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM v_citas WHERE v_citas.profecional_cita = i_profecional_cita;
 END;
$BODY$;

ALTER FUNCTION public.f_readcitas(numeric)
    OWNER TO veterinarias;







CREATE OR REPLACE FUNCTION public.f_createmascotas(
	i_nombre_mascota text,
	i_edad_mascota numeric,
	i_escala_edad numeric,
	i_esterilizado numeric,
	i_id_raza numeric,
	i_id_tamanio numeric,
	i_id_color numeric,
	i_genero_mascota numeric,
	i_descripcion_mascota text,
	i_id_clientes numeric,
    i_fecha_nacimiento text)
    RETURNS SETOF t_mascotas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY


 INSERT INTO t_mascotas(nombre_mascota, edad_mascota, escala_edad, esterilizado,
						id_raza, id_tamanio, id_color, genero_mascota, descripcion_mascota, id_clientes, fecha_nacimiento)

	VALUES ( i_nombre_mascota, i_edad_mascota, i_escala_edad, i_esterilizado, i_id_raza, i_id_tamanio,
			i_id_color, i_genero_mascota,i_descripcion_mascota, i_id_clientes, i_fecha_nacimiento)

	RETURNING *;
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_updatemascotas(
	i_id_mascotas numeric,
	i_nombre_mascota text,
	i_edad_mascota numeric,
	i_escala_edad numeric,
	i_esterilizado numeric,
	i_id_raza numeric,
	i_id_tamanio numeric,
	i_id_color numeric,
	i_genero_mascota numeric,
	i_descripcion_mascota text,
	i_id_clientes numeric,
    i_fecha_nacimiento text)
    RETURNS SETOF t_mascotas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY

 UPDATE public.t_mascotas
	SET  nombre_mascota=i_nombre_mascota,
	edad_mascota=i_edad_mascota, escala_edad=i_escala_edad, esterilizado=i_esterilizado,
	id_raza=i_id_raza, id_tamanio=i_id_tamanio,id_color=i_id_color,
	genero_mascota=i_genero_mascota, descripcion_mascota=i_descripcion_mascota, fecha_nacimiento = i_fecha_nacimiento
	WHERE id_mascotas=i_id_mascotas and id_clientes=i_id_clientes

    RETURNING *;
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_updatemascotasperfil(
	i_id_mascotas numeric,
	i_nombre_mascota text,
	i_edad_mascota numeric,
	i_id_raza numeric,
	i_id_color numeric,
	i_genero_mascota numeric,
    i_id_clientes numeric,
    i_fecha_nacimiento text)
    RETURNS SETOF t_mascotas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY

 UPDATE public.t_mascotas
	SET  nombre_mascota=i_nombre_mascota,
	edad_mascota=i_edad_mascota, id_raza=i_id_raza, id_color=i_id_color,genero_mascota=i_genero_mascota, fecha_nacimiento = i_fecha_nacimiento
	WHERE (id_mascotas=i_id_mascotas and id_clientes=i_id_clientes)

	RETURNING *;
 END;
$BODY$;




CREATE TABLE public.t_mascotas_vacunas
(
    id serial,
    id_vacuna numeric NOT NULL,
    id_mascota numeric NOT NULL,
    CONSTRAINT t_mascotas_vacunas_pkey PRIMARY KEY (id),
    CONSTRAINT t_mascotas_vacunas_id_mascota_fk FOREIGN KEY (id_mascota)
        REFERENCES public.t_mascotas (id_mascotas) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT t_mascotas_vacunas_id_vacuna_fk FOREIGN KEY (id_vacuna)
        REFERENCES public.t_vacunas (id_vacuna) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;






CREATE OR REPLACE FUNCTION public.f_readmascotasid(
	s_id_pets numeric)
    RETURNS SETOF t_mascotas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_mascotas WHERE t_mascotas.id_mascotas = s_id_pets;

 END;
$BODY$;

ALTER FUNCTION public.f_readmascotasid(numeric)
    OWNER TO veterinarias;









CREATE OR REPLACE FUNCTION public.f_compararfotosmascota(
	s_id_pets numeric,
	s_consecutivo numeric)
    RETURNS SETOF t_fotos_mascotas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY

 SELECT * FROM public.t_fotos_mascotas
 where t_fotos_mascotas.id_mascotas = s_id_pets AND t_fotos_mascotas.consecutivo=s_consecutivo;


 END;
$BODY$;








CREATE OR REPLACE FUNCTION public.f_readfotosforId(
	s_id_pets numeric)
    RETURNS SETOF t_fotos_mascotas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_fotos_mascotas WHERE t_fotos_mascotas.id_mascotas = s_id_user;


 END;
$BODY$;








CREATE OR REPLACE FUNCTION public.f_insert_t_fotos_masotas(

	i_ruta_guardado text,
    i_nombre_imagen text,
    i_id_mascotas numeric,
    i_consecutivo numeric

)
    RETURNS SETOF t_fotos_mascotas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY


 INSERT INTO t_fotos_mascotas
                (ruta_guardado,
                nombre_imagen,
                id_mascotas,
                consecutivo)
                VALUES (i_ruta_guardado,i_nombre_imagen , i_id_mascotas,i_consecutivo )




	RETURNING *;
 END;
$BODY$;









CREATE OR REPLACE FUNCTION public.f_insert_historial_clinico(
	i_fecha_grabacion text,
	i_hora text,
	i_profesional numeric,
	i_antecedentes text,
	i_sintomas text,
	i_observaciones text,
	i_diagnostico text,
	i_id_usuario numeric,
	i_id_formula numeric




)
    RETURNS SETOF t_historias_clinicas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY



 INSERT INTO t_historias_clinicas(fecha_grabacion, hora, profesional, antecedentes, sintomas, observaciones, diagnostico,id_usuario,id_formula)
	VALUES (i_fecha_grabacion, i_hora , i_profesional ,i_antecedentes ,i_sintomas , i_observaciones , i_diagnostico, i_id_usuario,i_id_formula )



	RETURNING *;
 END;
$BODY$;







CREATE TABLE public.t_medicinas
(
	id_medicina serial,
	medicina text,
    CONSTRAINT medicinas_pkey PRIMARY KEY ( id_medicina)

)





CREATE TABLE public.t_formulas
(
    id_formula serial,
	id_medicina numeric,
	dosificacion text,
	frecuencia text,
	dias text,
	recomendacion  text,


    CONSTRAINT formula_pkey PRIMARY KEY ( id_formula),

	CONSTRAINT fk_medicina FOREIGN KEY (id_medicina)
        REFERENCES public.t_medicinas(id_medicina) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION


)







CREATE OR REPLACE FUNCTION public.f_readmedicinas(
	)
    RETURNS SETOF t_medicinas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 select *  from t_medicinas;


 END;
$BODY$;







CREATE TABLE public.t_notas_historias
(
    id_nota serial,
	nota text,
	id_historias numeric,

    CONSTRAINT historias_nota_pkey PRIMARY KEY (id_nota),

	CONSTRAINT fk_t_historias_clinicas FOREIGN KEY (id_historias)
        REFERENCES public.t_historias_clinicas(id_historias) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION


)






CREATE OR REPLACE FUNCTION public.f_insert_notas_historias(
	i_nota text,
	i_id_historias numeric

)
    RETURNS SETOF t_notas_historias
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY

 INSERT INTO public.t_notas_historias( nota ,id_historias)
	VALUES (i_nota ,i_id_historias )


	RETURNING *;
 END;
$BODY$;









CREATE OR REPLACE FUNCTION public.f_insert_examen_historias(
	i_id_tipo_examen numeric,
	i_descripcion text,
	i_fecha_examen text,
	i_resultados text

)
    RETURNS SETOF t_examen
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY

 INSERT INTO public.t_examen( id_tipo_examen, descripcion, fecha_examen, resultados)
	VALUES (i_id_tipo_examen, i_descripcion, i_fecha_examen, i_resultados )


	RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_updatecitas(integer, text, text, numeric, text, numeric, numeric, numeric, numeric)
    OWNER TO veterinarias;



CREATE OR REPLACE VIEW public.v_historias_clinicas
 AS
 SELECT
    ff.id_historias,
    ff.fecha_grabacion,
    ff.hora,
    ff.profesional,
	a.usuario,
    ff.antecedentes,
    ff.sintomas,
    ff.observaciones,
    ff.diagnostico,
    ff.id_examen,
    ff.id_usuario,
    ff.id_formula,
	ff.id_mascotas,
	b.id_clientes,
	b.primer_nombre
   FROM t_historias_clinicas ff,
    t_usuario a,
	t_clientes b,
	t_mascotas c
  WHERE ff.profesional = a.id and ff.id_mascotas=c.id_mascotas and c.id_clientes =b.id_clientes;



CREATE OR REPLACE FUNCTION public.f_update_historial_clinico(
	i_id_historias numeric,
	i_fecha_grabacion text,
	i_hora text,
	i_profesional numeric,
	i_antecedentes text,
	i_sintomas text,
	i_observaciones text,
	i_diagnostico text,
	i_id_usuario numeric,
	i_id_formula numeric,
	i_id_mascotas numeric)
    RETURNS SETOF t_historias_clinicas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 UPDATE public.t_historias_clinicas
	SET fecha_grabacion=i_fecha_grabacion, hora=i_hora, profesional=i_profesional, antecedentes=i_antecedentes, sintomas=i_sintomas, observaciones=i_observaciones, diagnostico=i_diagnostico,
		id_formula=i_id_formula, id_mascotas=i_id_mascotas
	WHERE id_historias=i_id_historias and id_usuario=i_id_usuario
RETURNING *;
 END;
$BODY$;

 CREATE OR REPLACE FUNCTION public.f_readhistoriaid(
	i_id_historias numeric)
    RETURNS SETOF t_historias_clinicas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_historias_clinicas WHERE t_historias_clinicas.id_historias = i_id_historias;

 END;
$BODY$;

UPDATE public.t_historias_clinicas
	SET fecha_grabacion=i_fecha_grabacion, hora=i_hora, profesional=i_profesional, antecedentes=i_antecedentes, sintomas=i_sintomas, observaciones=i_observaciones, diagnostico=i_diagnostico,
	id_formula=i_id_formula, id_mascotas=i_id_mascotas
	WHERE id_historias=i_id_historias and id_usuario=i_id_usuario
RETURNING *;
 END;
$BODY$;





CREATE OR REPLACE VIEW public.v_citas
 AS
 SELECT ct.id_cita,
    ct.fecha_cita,
    ct.hora_cita,
    ct.id_tipo_cita,
    tp.tipo_cita,
    ct.descripcion_cita,
    ct.paciente_cita,
    ms.nombre_mascota,
    ct.propietario_cita,
    cl.primer_nombre AS nombre_propietario,
    cl.primer_apellido AS apellido_propietario,
    ct.profecional_cita,
    us.primer_nombre AS nombre_profesional,
    us.primer_apellido AS apellido_profesional,
    ct.estado_cita,
    ct.dia_cita
   FROM t_citas ct,
    t_tipo_cita tp,
    t_mascotas ms,
    t_clientes cl,
    t_usuario us
  WHERE ct.id_tipo_cita = tp.id_tipo_cita AND ct.paciente_cita = ms.id_mascotas AND ct.propietario_cita = cl.id_clientes AND ct.profecional_cita = us.id;

ALTER TABLE public.v_citas
    OWNER TO veterinarias;




CREATE OR REPLACE FUNCTION public.f_createcitas(
	i_fecha_cita text,
	i_hora_cita text,
	i_id_tipo_cita numeric,
	i_descripcion_cita text,
	i_paciente_cita numeric,
	i_propietario_cita numeric,
	i_profecional_cita numeric,
	i_estado_cita numeric,
	i_dia_cita text)
    RETURNS SETOF t_citas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN
 RETURN QUERY
 INSERT INTO t_citas(fecha_cita, hora_cita, id_tipo_cita, descripcion_cita,
    paciente_cita, propietario_cita, profecional_cita, estado_cita, dia_cita)
	
	VALUES (i_fecha_cita, i_hora_cita, i_id_tipo_cita, i_descripcion_cita,
	i_paciente_cita, i_propietario_cita, i_profecional_cita, i_estado_cita, i_dia_cita)
	
	RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_createcitas(text, text, numeric, text, numeric, numeric, numeric, numeric, text)
    OWNER TO veterinarias;






CREATE OR REPLACE FUNCTION public.f_deletecitas(
	i_id_cita integer)
    RETURNS SETOF t_citas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 DELETE FROM t_citas WHERE id_cita = i_id_cita
 RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_deletecitas(integer)
    OWNER TO veterinarias;





CREATE OR REPLACE FUNCTION public.f_updatecitas(
	i_id_cita integer,
	i_fecha_cita text,
	i_hora_cita text,
	i_id_tipo_cita numeric,
	i_descripcion_cita text,
	i_paciente_cita numeric,
	i_propietario_cita numeric,
	i_profecional_cita numeric,
	i_estado_cita numeric,
	i_dia_cita text)
    RETURNS SETOF t_citas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 UPDATE t_citas

 SET fecha_cita = i_fecha_cita, hora_cita = i_hora_cita, id_tipo_cita = i_id_tipo_cita,
    descripcion_cita = i_descripcion_cita, paciente_cita = i_paciente_cita,
    propietario_cita = i_propietario_cita, profecional_cita = i_profecional_cita,
    estado_cita = i_estado_cita, dia_cita = i_dia_cita

	WHERE (id_cita = i_id_cita)

	RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_updatecitas(integer, text, text, numeric, text, numeric, numeric, numeric, numeric, text)
    OWNER TO veterinarias;





CREATE OR REPLACE FUNCTION public.f_searchcitas(
	i_profecional_cita numeric,
	i_param_busqueda text,
	i_estado_cita numeric)
    RETURNS SETOF v_citas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
	SELECT * FROM v_citas WHERE (fecha_cita LIKE '%' || i_param_busqueda || '%' OR hora_cita
		LIKE '%' || i_param_busqueda || '%' OR tipo_cita LIKE '%' || i_param_busqueda || '%'
		OR descripcion_cita LIKE '%' || i_param_busqueda || '%' OR nombre_mascota LIKE '%' || i_param_busqueda || '%'
		OR nombre_propietario LIKE '%' || i_param_busqueda || '%' OR apellido_propietario LIKE '%' || i_param_busqueda || '%'
		OR nombre_profesional LIKE '%' || i_param_busqueda || '%' OR apellido_profesional LIKE '%' || i_param_busqueda || '%'
		OR estado_cita = i_estado_cita OR dia_cita LIKE '%' || i_param_busqueda || '%')
		AND (profecional_cita = i_profecional_cita);
 END;
$BODY$;

ALTER FUNCTION public.f_searchcitas(numeric, text, numeric)
    OWNER TO veterinarias;




CREATE OR REPLACE VIEW public.v_desparasitaciones
 AS
 SELECT dp.id_desparasitante,
    dp.id_tipo_desparasitante,
    td.tipo_desparasitante,
    dp.fecha_desparasitante,
    dp.dosis,
    dp.fecha_proximo_des,
    dp.sintomas_desparasitante,
    dp.id_mascotas,
    ms.nombre_mascota,
    ms.id_clientes,
    cl.primer_nombre AS nombre_cliente,
    cl.primer_apellido AS apellido_cliente,
    cl.id_usuario,
    us.primer_nombre AS nombre_usuario,
    us.primer_apellido AS apellido_usuario
   FROM t_desparasitante dp,
    t_tipo_desparasitante td,
    t_usuario us,
    t_clientes cl,
    t_mascotas ms
  WHERE dp.id_tipo_desparasitante = td.id_tipo_desparasitante AND dp.id_mascotas = ms.id_mascotas AND ms.id_clientes = cl.id_clientes AND cl.id_usuario = us.id;

ALTER TABLE public.v_desparasitaciones
    OWNER TO veterinarias;





CREATE OR REPLACE FUNCTION public.f_readdesparasitante(
	i_id_usuario numeric,
	i_id_clientes numeric,
	i_id_mascotas numeric)
    RETURNS SETOF v_desparasitaciones
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM v_desparasitaciones WHERE v_desparasitaciones.id_usuario = i_id_usuario
 AND v_desparasitaciones.id_clientes = i_id_clientes
 AND v_desparasitaciones.id_mascotas = i_id_mascotas;
 END;
$BODY$;

ALTER FUNCTION public.f_readdesparasitante(numeric, numeric, numeric)
    OWNER TO veterinarias;




CREATE OR REPLACE FUNCTION public.f_createdesparasitaciones(
	i_id_tipo_desparasitante numeric,
	i_fecha_desparasitante text,
	i_dosis text,
	i_fecha_proximo_des text,
	i_sintomas_desparasitante text,
	i_id_mascotas numeric)
    RETURNS SETOF t_desparasitante
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 INSERT INTO t_desparasitante(id_tipo_desparasitante, fecha_desparasitante, dosis,
			fecha_proximo_des, sintomas_desparasitante, id_mascotas)

	VALUES (i_id_tipo_desparasitante, i_fecha_desparasitante, i_dosis,
			i_fecha_proximo_des, i_sintomas_desparasitante, i_id_mascotas)

	RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_createdesparasitaciones(numeric, text, text, text, text, numeric)
    OWNER TO veterinarias;




CREATE OR REPLACE FUNCTION public.f_deletedesparasitante(
	i_id_desparasitante integer)
    RETURNS SETOF t_desparasitante
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 DELETE FROM t_desparasitante WHERE id_desparasitante = i_id_desparasitante
 RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_deletedesparasitante(integer)
    OWNER TO veterinarias;




CREATE OR REPLACE FUNCTION public.f_updatedesparasitaciones(
	i_id_desparasitante integer,
	i_id_tipo_desparasitante numeric,
	i_fecha_desparasitante text,
	i_dosis text,
	i_fecha_proximo_des text,
	i_sintomas_desparasitante text,
	i_id_mascotas numeric)
    RETURNS SETOF t_desparasitante
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 UPDATE t_desparasitante

 SET id_tipo_desparasitante = i_id_tipo_desparasitante, fecha_desparasitante = i_fecha_desparasitante,
 	dosis = i_dosis, fecha_proximo_des = i_fecha_proximo_des, sintomas_desparasitante = i_sintomas_desparasitante,
    id_mascotas = i_id_mascotas

	WHERE (id_desparasitante = i_id_desparasitante)

	RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_updatedesparasitaciones(integer, numeric, text, text, text, text, numeric)
    OWNER TO veterinarias;




CREATE OR REPLACE FUNCTION public.f_searchdesparasitante(
	i_id_usuario numeric,
	i_param_busqueda text)
    RETURNS SETOF v_desparasitaciones
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
	SELECT * FROM v_desparasitaciones WHERE (tipo_desparasitante LIKE '%' || i_param_busqueda || '%'
		OR fecha_desparasitante LIKE '%' || i_param_busqueda || '%' OR dosis LIKE '%' || i_param_busqueda || '%'
		OR fecha_proximo_des LIKE '%' || i_param_busqueda || '%' OR sintomas_desparasitante LIKE '%' || i_param_busqueda || '%'
		OR nombre_mascota LIKE '%' || i_param_busqueda || '%' OR nombre_cliente LIKE '%' || i_param_busqueda || '%'
		OR apellido_cliente LIKE '%' || i_param_busqueda || '%')
		AND (id_usuario = i_id_usuario);
 END;
$BODY$;

ALTER FUNCTION public.f_searchdesparasitante(numeric, text)
    OWNER TO veterinarias;

CREATE OR REPLACE FUNCTION public.f_readdepartamentosCol(
	)
    RETURNS SETOF t_ubicaciones_geograficas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_ubicaciones_geograficas WHERE t_ubicaciones_geograficas.id_unde=1 AND t_ubicaciones_geograficas.vigente='true';
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_readt_municipiobyId(
	i_id_unde numeric)
    RETURNS SETOF t_ubicaciones_geograficas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_ubicaciones_geograficas WHERE t_ubicaciones_geograficas.id_unde=i_id_unde AND t_ubicaciones_geograficas.vigente='true';
 END;
$BODY$;

CREATE OR REPLACE FUNCTION public.f_readgubiregister(
	)
    RETURNS SETOF t_ubicaciones_geograficas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_ubicaciones_geograficas WHERE t_ubicaciones_geograficas.id_unde=0 AND t_ubicaciones_geograficas.vigente='true' AND tipo='PA';
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_read_razamascotas(
	)
    RETURNS TABLE(id_raza numeric, nombre_raza text,
				  id_tipo_mascota numeric, id_tamanio numeric)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT t_razas.id_raza, t_razas.nombre_raza,
 		t_razas.id_tipo_mascota, t_razas.id_tamanio FROM t_razas;
 END;
$BODY$;

ALTER FUNCTION public.f_read_razamascotas()
    OWNER TO veterinarias;



CREATE OR REPLACE FUNCTION public.f_read_tipomascotas(
	)
    RETURNS TABLE(id_tipo_mascota numeric, nombre_tipo text)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT t_tipos_mascotas.id_tipo_mascota, t_tipos_mascotas.nombre_tipo FROM t_tipos_mascotas;
 END;
$BODY$;

ALTER FUNCTION public.f_read_tipomascotas()
    OWNER TO veterinarias;



CREATE OR REPLACE FUNCTION public.f_read_generomascota(
	)
    RETURNS TABLE(genero_mascota numeric, tipo text)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT t_genero_mascota.genero_mascota, t_genero_mascota.tipo FROM t_genero_mascota;
 END;
$BODY$;

ALTER FUNCTION public.f_read_generomascota()
    OWNER TO veterinarias;



CREATE OR REPLACE FUNCTION public.f_read_coloresmascotas(
	)
    RETURNS TABLE(id_color numeric, nombre_color text)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT t_colores.id_color, t_colores.nombre_color FROM t_colores;
 END;
$BODY$;

ALTER FUNCTION public.f_read_coloresmascotas()
    OWNER TO veterinarias;



CREATE OR REPLACE FUNCTION public.f_read_tamaniomascotas(
	)
    RETURNS TABLE(id_tamanio numeric, tamanio text)
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT t_tamanios.id_tamanio, t_tamanios.tamanio FROM t_tamanios;
 END;
$BODY$;

ALTER FUNCTION public.f_read_tamaniomascotas()
    OWNER TO veterinarias;




CREATE TABLE public.t_configuracion_citas
(
    id_conf_cita integer NOT NULL DEFAULT nextval('t_configuracion_citas_id_conf_cita_seq'::regclass),
    id_tipo_cita numeric,
    hora_inicio text COLLATE pg_catalog."default",
    hora_expiracion text COLLATE pg_catalog."default",
    dias text[] COLLATE pg_catalog."default",
    id_usuario numeric,
    CONSTRAINT conf_cita_pkey PRIMARY KEY (id_conf_cita),
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario)
        REFERENCES public.t_usuario (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_tipo_cita FOREIGN KEY (id_tipo_cita)
        REFERENCES public.t_tipo_cita (id_tipo_cita) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.t_configuracion_citas
    OWNER to veterinarias;



CREATE OR REPLACE FUNCTION public.f_create_configuracioncitas(
	i_id_tipo_cita numeric,
	i_hora_inicio text,
	i_hora_expiracion text,
	i_dias text[],
	i_id_usuario numeric)
    RETURNS SETOF t_configuracion_citas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 INSERT INTO t_configuracion_citas(id_tipo_cita, hora_inicio, hora_expiracion, dias, id_usuario)

	VALUES (i_id_tipo_cita, i_hora_inicio, i_hora_expiracion, i_dias, i_id_usuario)

	RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_create_configuracioncitas(numeric, text, text, text[], numeric)
    OWNER TO veterinarias;



CREATE OR REPLACE FUNCTION public.f_update_configuracioncitas(
	i_id_conf_cita integer,
	i_id_tipo_cita numeric,
	i_hora_inicio text,
	i_hora_expiracion text,
	i_dias text[],
	i_id_usuario numeric)
    RETURNS SETOF t_configuracion_citas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 UPDATE t_configuracion_citas

 SET id_tipo_cita = i_id_tipo_cita, hora_inicio = i_hora_inicio,
 	hora_expiracion = i_hora_expiracion, dias = i_dias, id_usuario = i_id_usuario

	WHERE (id_conf_cita = i_id_conf_cita)

	RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_update_configuracioncitas(integer, numeric, text, text, text[], numeric)
    OWNER TO veterinarias;



CREATE OR REPLACE FUNCTION public.f_read_configuracioncitas(
	i_id_usuario numeric)
    RETURNS SETOF t_configuracion_citas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_configuracion_citas WHERE t_configuracion_citas.id_usuario = i_id_usuario;
 END;
$BODY$;

ALTER FUNCTION public.f_read_configuracioncitas(numeric)
    OWNER TO veterinarias;



CREATE OR REPLACE FUNCTION public.f_delete_configuracioncitas(
	i_id_conf_cita integer)
    RETURNS SETOF t_configuracion_citas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 DELETE FROM t_configuracion_citas WHERE id_conf_cita = i_id_conf_cita
 RETURNING *;
 END;
$BODY$;

ALTER FUNCTION public.f_delete_configuracioncitas(integer)
    OWNER TO veterinarias;



CREATE OR REPLACE FUNCTION public.f_validar_disponibilidad(
	i_hora_cita text,
	i_id_tipo_cita numeric,
	i_id_usuario numeric,
	i_dia_cita text)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
 	 conf_row t_configuracion_citas%rowtype;
 BEGIN 
	 SELECT * FROM t_configuracion_citas
	 INTO conf_row
	 WHERE t_configuracion_citas.id_tipo_cita = i_id_tipo_cita
	 AND t_configuracion_citas.id_usuario = i_id_usuario;
	 
	 IF NOT FOUND THEN
	 	RETURN TRUE;
	 ELSE
	 	IF (i_hora_cita >= conf_row.hora_inicio AND i_hora_cita <= conf_row.hora_expiracion)
		AND (LOWER(i_dia_cita) ILIKE ANY (conf_row.dias)) THEN
			RETURN TRUE;
		ELSE
			RETURN FALSE;
		END IF;
	 END IF;
 END;
$BODY$;

ALTER FUNCTION public.f_validar_disponibilidad(text, numeric, numeric, text)
    OWNER TO veterinarias;




CREATE TABLE public.t_usuario_codigo
(
    id numeric NOT NULL,
    correo_electronico character varying(200) COLLATE pg_catalog."default" NOT NULL,
    primer_nombre character varying(100) COLLATE pg_catalog."default" NOT NULL,
    segundo_nombre character varying(100) COLLATE pg_catalog."default",
    primer_apellido character varying(100) COLLATE pg_catalog."default" NOT NULL,
    segundo_apellido character varying(100) COLLATE pg_catalog."default",
    firewall character varying(200) COLLATE pg_catalog."default",
    codigo numeric,
    estado numeric,
    fecha_codigo_gen timestamp with time zone,
    fecha_aceptacion_codigo timestamp with time zone,
    fecha_cancelacion timestamp with time zone,
    ubicacion numeric,
    telefono character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT t_usuario_codigo_pkey PRIMARY KEY (id)
)



CREATE TABLE public.t_codigo_verificacion
(
    id numeric NOT NULL,
    codigo numeric NOT NULL,
    fecha_codigo_gen timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_aceptacion_codigo timestamp with time zone,
    id_usuario_codigo numeric NOT NULL,
    estado numeric,
    fecha_cancelacion timestamp with time zone,
    firewall character varying(200) COLLATE pg_catalog."default",
    usuario character varying(200) COLLATE pg_catalog."default",
    correo character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT id_codigo_pkey PRIMARY KEY (id)
)


CREATE TABLE public.t_usuario
(
    id numeric NOT NULL DEFAULT nextval('t_usuario_id_seq'::regclass),
    tipo character varying(2) COLLATE pg_catalog."default" NOT NULL,
    usuario character varying(200) COLLATE pg_catalog."default" NOT NULL,
    correo character varying(200) COLLATE pg_catalog."default" NOT NULL,
    password character varying(60) COLLATE pg_catalog."default" NOT NULL,
    origen_cuenta character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'Registro Normal'::character varying,
    estado character(1) COLLATE pg_catalog."default" DEFAULT 'S'::bpchar,
    tipo_identificacion character varying(2) COLLATE pg_catalog."default",
    identificacion character varying(100) COLLATE pg_catalog."default",
    primer_nombre character varying(100) COLLATE pg_catalog."default",
    segundo_nombre character varying(100) COLLATE pg_catalog."default",
    primer_apellido character varying(100) COLLATE pg_catalog."default",
    segundo_apellido character varying(100) COLLATE pg_catalog."default",
    telefono character varying(50) COLLATE pg_catalog."default",
    codigo_ubicacion_geografica numeric,
    categoria numeric,
    nivel_seguridad numeric,
    num_fallidos numeric,
    num_dias_caducid numeric,
    num_dias_cambio numeric,
    cod_desactiva numeric,
    observaciones character varying(500) COLLATE pg_catalog."default",
    reinicio_password numeric,
    runt numeric,
    usuario_grabacion character varying(100) COLLATE pg_catalog."default",
    fecha_grabacion date,
    usuario_modificacion character varying(100) COLLATE pg_catalog."default",
    fecha_modificacion date,
    firewall character varying(200) COLLATE pg_catalog."default",
    CONSTRAINT usuario_pkey PRIMARY KEY (id),
    CONSTRAINT usuario_pais_fk FOREIGN KEY (codigo_ubicacion_geografica)
        REFERENCES public.t_ubicaciones_geograficas (codigo_dane) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)



CREATE SEQUENCE public.t_usu_regis_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;



CREATE OR REPLACE FUNCTION public.f_register_user(
	i_correo character varying,
	i_primer_nombre character varying,
	i_segundo_nombre character varying,
	i_primer_apellido character varying,
	i_segundo_apellido character varying,
	i_telefono character varying,
	i_firewall character varying,
	i_ubicacion numeric,
	OUT respuesta character varying,
	OUT rest numeric,
	OUT codigo_verificacion numeric,
	OUT correo_electronico character varying)
    RETURNS record
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE 
     conteo numeric;
     conteo_codigo numeric;
     i_codigo  numeric;
	 
 BEGIN 
 
 BEGIN
 SELECT COUNT(*) INTO conteo
 FROM public.t_usuario as tuc
 WHERE tuc.correo = i_correo;
 IF conteo > 0  THEN
  respuesta := 'Usuario ya se encuentra registrado';
  rest := 2;
  codigo_verificacion :=  0;
  correo_electronico  := '';
  RETURN;
 END IF;
 END;
 
 BEGIN
   SELECT COUNT(*) INTO conteo_codigo
   FROM public.t_usuario_codigo as tuco
   WHERE tuco.correo_electronico = i_correo
   AND tuco.estado  = 1;
  IF conteo_codigo > 0  THEN
   UPDATE t_usuario_codigo cod SET estado = 3 , fecha_cancelacion =  NOW()
   WHERE cod.correo_electronico = i_correo
   AND cod.estado = 1;
  END IF;
END;
 
 BEGIN
    SELECT floor(random()*(999999-111111+1))+111111 INTO i_codigo;
 END;
 INSERT INTO public.t_usuario_codigo as usu_cod(
	id, correo_electronico, primer_nombre,segundo_nombre, primer_apellido,segundo_apellido, firewall , codigo , estado , fecha_codigo_gen , ubicacion , telefono) 
	VALUES ( nextval('t_usu_regis_id_seq'::regclass), i_correo, i_primer_nombre, i_segundo_nombre, i_primer_apellido, i_segundo_apellido,i_firewall , i_codigo , 1 ,NOW() , i_ubicacion , i_telefono);
	respuesta := 'Se ha enviado codigo de verificación a su correo de registro';
	rest := 1;
    codigo_verificacion := i_codigo;
    correo_electronico  := i_correo;
 END;
$BODY$;




CREATE OR REPLACE FUNCTION public.f_register_user_veri(
	i_correo character varying,
	i_primer_nombre character varying,
	i_segundo_nombre character varying,
	i_primer_apellido character varying,
	i_segundo_apellido character varying,
	i_telefono character varying,
	i_ubicacion numeric,
	i_codigo_veri numeric,
	i_password character varying,
	i_firewall character varying,
	OUT respuesta character varying,
	OUT rest numeric)
    RETURNS record
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE 
     conteo numeric;
     conteo_codigo numeric;
     i_codigo  numeric;
	 
 BEGIN 
 
 BEGIN
   SELECT COUNT(*) INTO conteo_codigo
   FROM public.t_usuario_codigo as tuco
   WHERE tuco.correo_electronico = i_correo
   AND tuco.estado  = 1
   AND tuco.codigo = i_codigo_veri;
  IF conteo_codigo > 0  THEN
   UPDATE t_usuario_codigo cod SET estado = 2 , fecha_aceptacion_codigo =  NOW()
   WHERE cod.correo_electronico = i_correo
   AND cod.estado = 1
   AND cod.codigo = i_codigo_veri;
  ELSE 
   respuesta := 'El codigo de verificacion no es valido para este correo , reenvie otro codigo de verificacion';
   rest := 2;
   RETURN;
  END IF;
 END;
 
 BEGIN
 INSERT INTO t_usuario(id, tipo, usuario, correo, password, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, codigo_ubicacion_geografica, firewall, telefono) 
  
 VALUES (nextval('t_usuario_id_seq'::regclass), 'NO', i_correo, i_correo, i_password, i_primer_nombre, i_segundo_nombre, i_primer_apellido, i_segundo_apellido, i_ubicacion, i_firewall, i_telefono);
	respuesta := 'Se ha hecho el registro exitosamente';
	rest := 1;
	RETURN;
  END;
 
 END;
$BODY$;




CREATE OR REPLACE FUNCTION public.f_register_auth(
	i_correo character varying,
	i_firewall character varying,
	OUT respuesta character varying,
	OUT rest numeric,
	OUT codigo_verificacion numeric,
	OUT correo_electronico character varying,
	OUT primer_nombre character varying,
	OUT primer_apellido character varying,
	OUT id_usuario numeric)
    RETURNS record
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE 
     usuario t_usuario%rowtype;
     conteo_codigo numeric;
     i_codigo  numeric;
	 i_id_usuario numeric;
	 
 BEGIN 
 
 BEGIN
 SELECT * INTO usuario
 FROM public.t_usuario as tuc
 WHERE tuc.correo = i_correo;
 IF NOT FOUND THEN
  respuesta := 'No se encuentra el usuario registrado';
  rest := 2;
  codigo_verificacion :=  0;
  correo_electronico  := '';
  RETURN;
   
 END IF;
 END;
 
 BEGIN
 SELECT tuc.id INTO i_id_usuario
 FROM public.t_usuario as tuc
 WHERE tuc.correo = i_correo;

 END;
 
 BEGIN
   SELECT COUNT(*) INTO conteo_codigo
   FROM public.t_codigo_verificacion as tuco
   WHERE tuco.correo = i_correo
   AND tuco.estado  = 1;
  IF conteo_codigo > 0  THEN
   UPDATE t_codigo_verificacion cod SET estado = 3 , fecha_cancelacion =  NOW()
   WHERE cod.correo = i_correo
   AND cod.estado = 1;
  END IF;
END;
 
 BEGIN
    SELECT floor(random()*(999999-111111+1))+111111 INTO i_codigo;
 END;
 INSERT INTO public.t_codigo_verificacion as usu_cod(
	id, correo, firewall , codigo , estado , fecha_codigo_gen , id_usuario_codigo , usuario) 
	VALUES ( nextval('t_usuario_codigo_id_seq'::regclass), i_correo, i_firewall , i_codigo , 1 ,NOW() , i_id_usuario ,  i_correo );
	respuesta := 'Se ha enviado codigo de verificación a su correo de registro';
	rest := 1;
    codigo_verificacion := i_codigo;
    correo_electronico  := i_correo;
	id_usuario := i_id_usuario;
	primer_nombre := usuario.primer_nombre;
    primer_apellido := usuario.primer_apellido;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_register_auth_veri(
	i_correo character varying,
	i_codigo_veri numeric,
	i_firewall character varying,
	OUT respuesta character varying,
	OUT rest numeric)
    RETURNS record
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE 
     conteo numeric;
     conteo_codigo numeric;
     i_codigo  numeric;
	 
 BEGIN 
 
 BEGIN
   SELECT COUNT(*) INTO conteo_codigo
   FROM public.t_codigo_verificacion as tuco
   WHERE tuco.correo = i_correo
   AND tuco.estado  = 1
   AND tuco.codigo = i_codigo_veri;
  IF conteo_codigo > 0  THEN
   UPDATE t_codigo_verificacion cod SET estado = 2 , fecha_aceptacion_codigo =  NOW()
   WHERE cod.correo = i_correo
   AND cod.estado = 1
   AND cod.codigo = i_codigo_veri;
   ELSE 
   respuesta := 'El codigo de verificacion no es valido para este correo , reenvie otro codigo de verificacion';
   rest := 2;
   RETURN;
  END IF;
END;
	respuesta := 'El codigo de verificación es correcto';
	rest := 1;
	RETURN;
  END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_update_usu_pass(
	i_id_usuario numeric,
	i_password character varying,
	OUT rest character varying,
	OUT respuesta character varying)
    RETURNS record
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
 BEGIN
 	UPDATE t_usuario SET password = i_password WHERE id = i_id_usuario;
	IF FOUND THEN
		rest := 1;
		respuesta := 'La contraseña se ha modificado exitosamente';
	ELSE
		rest := 2;
		respuesta := 'El usuario no existe';
	END IF;
	RETURN;
 END;
$BODY$;




CREATE OR REPLACE FUNCTION public.f_readvacunas_tipomascota(
	i_id_tipo_mascota numeric)
    RETURNS SETOF t_tipo_vacunas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_tipo_vacunas where t_tipo_vacunas.id_tipo_mascota= i_id_tipo_mascota;
 END;
$BODY$;




CREATE OR REPLACE FUNCTION public.f_readdesparasitantes_tipomascota(
	i_id_tipo_mascota numeric)
    RETURNS SETOF t_tipo_desparasitante 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_tipo_desparasitante where t_tipo_desparasitante.id_tipo_mascota= i_id_tipo_mascota;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_update_usu_email(
	i_id_usuario numeric,
	i_correo character varying,
	OUT rest character varying,
	OUT respuesta character varying)
    RETURNS record
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
 BEGIN
 	UPDATE t_usuario SET correo = i_correo WHERE id = i_id_usuario;
	IF FOUND THEN
		rest := 1;
		respuesta := 'El correo se ha modificado exitosamente';
	ELSE
		rest := 2;
		respuesta := 'El usuario no existe';
	END IF;
	RETURN;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_update_usu(
	i_id_usuario numeric,
	i_primer_nombre character varying,
	i_segundo_nombre character varying,
	i_primer_apellido character varying,
	i_segundo_apellido character varying,
	i_telefono character varying,
	i_ubicacion numeric)
    RETURNS SETOF t_usuario 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 	UPDATE t_usuario 
	SET primer_nombre = i_primer_nombre, segundo_nombre = i_segundo_nombre,
	primer_apellido = i_primer_apellido, segundo_apellido = i_segundo_apellido,
	telefono = i_telefono, codigo_ubicacion_geografica = i_ubicacion
	WHERE id = i_id_usuario
	RETURNING *;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_readvacunas_tipomascota(
	i_id_tipo_mascota numeric)
    RETURNS SETOF t_tipo_vacunas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_tipo_vacunas where t_tipo_vacunas.id_tipo_mascota= i_id_tipo_mascota;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_readt_usuario_codigo(
	s_correo character varying)
    RETURNS SETOF t_usuario_codigo 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN query
 SELECT * FROM t_usuario_codigo
 WHERE t_usuario_codigo.correo_electronico = s_correo AND t_usuario_codigo.estado = 1;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_readt_codigo_verificacion(
	s_correo character varying)
    RETURNS SETOF t_codigo_verificacion 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN query
 SELECT * FROM t_codigo_verificacion
 WHERE t_codigo_verificacion.correo = s_correo AND t_codigo_verificacion.estado = 1;
 END;
$BODY$;



CREATE SEQUENCE public.t_inventarios_id_inventario_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;



CREATE SEQUENCE public.t_tipo_productos_id_tipo_producto_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;



CREATE TABLE public.t_tipo_productos
(
    id_tipo_producto numeric NOT NULL DEFAULT nextval('t_tipo_productos_id_tipo_producto_seq'::regclass),
    tipo character varying(200),
    CONSTRAINT id_tipo_producto_pkey PRIMARY KEY (id_tipo_producto)
)



CREATE TABLE public.t_inventarios
(
    id_inventario numeric NOT NULL DEFAULT nextval('t_inventarios_id_inventario_seq'::regclass),
    nombre_producto character varying(200),
    precio_producto numeric,
    cantidad_producto numeric,
    id_tipo_producto numeric,
	id_usuario numeric,
	id_tipo_mascota numeric,
    CONSTRAINT id_inventario_pkey PRIMARY KEY (id_inventario),
    CONSTRAINT t_inventarios_id_tipo_producto_fk FOREIGN KEY (id_tipo_producto)
        REFERENCES public.t_tipo_productos (id_tipo_producto) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT t_inventarios_id_usuario_fk FOREIGN KEY (id_usuario)
        REFERENCES public.t_usuario (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT t_inventarios_id_tipo_mascota_fk FOREIGN KEY (id_tipo_mascota)
        REFERENCES public.t_tipos_mascotas (id_tipo_mascota) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)



CREATE OR REPLACE FUNCTION public.f_readinventarios_veterinaria(
	i_id_usuario numeric)
    RETURNS SETOF t_inventarios
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_inventarios WHERE t_inventarios.id_usuario=i_id_usuario;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_readinventarios_producto(
	i_id_tipo_producto numeric)
    RETURNS SETOF t_inventarios
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_inventarios WHERE t_inventarios.id_tipo_producto=i_id_tipo_producto;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_readinventarios_mascota(
	i_id_tipo_mascota numeric)
    RETURNS SETOF t_inventarios
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_inventarios WHERE t_inventarios.id_tipo_mascota=i_id_tipo_mascota;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_createinventarios(
	i_nombre_producto character varying,
	i_precio_producto numeric,
	i_cantidad_producto numeric,
	i_id_tipo_producto numeric,
	i_id_usuario numeric,
	i_id_tipo_mascota numeric)
    RETURNS SETOF t_inventarios 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN
 RETURN QUERY
 INSERT INTO t_inventarios(nombre_producto, precio_producto, cantidad_producto,
    id_tipo_producto, id_usuario, id_tipo_mascota)
	
	VALUES (i_nombre_producto, i_precio_producto, i_cantidad_producto,
	i_id_tipo_producto, i_id_usuario, i_id_tipo_mascota)
	
	RETURNING *;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_updateinventarios(
	i_id_inventario numeric,
	i_nombre_producto character varying,
	i_precio_producto numeric,
	i_cantidad_producto numeric,
	i_id_tipo_producto numeric,
	i_id_usuario numeric,
	i_id_tipo_mascota numeric)
    RETURNS SETOF t_inventarios 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN
 RETURN QUERY
 UPDATE t_inventarios
 	SET nombre_producto = i_nombre_producto, precio_producto = i_precio_producto,
 	cantidad_producto = i_cantidad_producto, id_tipo_producto = i_id_tipo_producto,
	id_usuario = i_id_usuario, id_tipo_mascota = i_id_tipo_mascota
	
	WHERE (id_inventario = i_id_inventario)
	
	RETURNING *;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_searcht_inventarioid(
	i_id_inventario numeric)
    RETURNS SETOF t_inventarios 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_inventarios WHERE t_inventarios.id_inventario = i_id_inventario;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_deleteinventario(
	i_id_inventario numeric)
    RETURNS SETOF t_inventarios 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 DELETE FROM t_inventarios WHERE t_inventarios.id_inventario = i_id_inventario
 RETURNING *;
 END;
$BODY$;


CREATE SEQUENCE public.t_ofertas_id_oferta_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;


CREATE TABLE public.t_ofertas
(
    id_oferta numeric NOT NULL DEFAULT nextval('t_ofertas_id_oferta_seq'::regclass),
    porcentaje_oferta numeric,
    tipo_descuento numeric,
    id_inventario numeric,
    CONSTRAINT id_oferta_pkey PRIMARY KEY (id_oferta),
    CONSTRAINT t_ofertas_id_inventario_fk FOREIGN KEY (id_inventario)
        REFERENCES public.t_inventarios (id_inventario) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


CREATE OR REPLACE FUNCTION public.f_readt_ofertas(
	i_id_inventario numeric,
	i_porcentaje_oferta numeric)
    RETURNS SETOF t_ofertas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN query
 SELECT * FROM t_ofertas
 WHERE t_ofertas.id_inventario = i_id_inventario AND t_ofertas.porcentaje_oferta = i_porcentaje_oferta;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_readusuregister(
	s_correo character varying)
    RETURNS TABLE(id numeric, tipo character varying, correo character varying, password character varying, origen_cuenta character varying, estado character, id_tipo_identificacion numeric, identificacion character varying, primer_nombre character varying, segundo_nombre character varying, primer_apellido character varying, segundo_apellido character varying, telefono character varying, codigo_ubicacion_geografica numeric, categoria numeric, nivel_seguridad numeric, num_fallidos numeric, num_dias_caducid numeric, num_dias_cambio numeric, cod_desactiva numeric, observaciones character varying, reinicio_password numeric, runt numeric, usuario_grabacion character varying, fecha_grabacion date, usuario_modificacion character varying, fecha_modificacion date, firewall character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN query
 SELECT * FROM t_usuario
WHERE t_usuario.correo = s_correo;
 END;
$BODY$;


CREATE OR REPLACE VIEW public.v_ofertas
 AS
 SELECT iv.id_inventario,
    iv.nombre_producto,
    iv.id_tipo_producto,
    tp.tipo AS nombre_tipo_producto,
    iv.id_tipo_mascota,
    tm.nombre_tipo AS nombre_tipo_mascota,
    iv.precio_producto,
    iv.cantidad_producto,
    iv.precio_producto * iv.cantidad_producto AS valor_total,
	ft.id_oferta,
	ft.porcentaje_oferta,
	ft.tipo_descuento,
	CASE WHEN tipo_descuento = 1
		THEN 'Un producto'
		ELSE 'Más de un producto'
	END AS nombre_tipo_descuento,
	CASE WHEN tipo_descuento = 1
		THEN iv.precio_producto * (ft.porcentaje_oferta / 100)
		ELSE (iv.precio_producto * iv.cantidad_producto) * (ft.porcentaje_oferta / 100)
	END AS valor_descontado,
	CASE WHEN tipo_descuento = 1
		THEN iv.precio_producto - (iv.precio_producto * (ft.porcentaje_oferta / 100))
		ELSE (iv.precio_producto * iv.cantidad_producto) - ((iv.precio_producto * iv.cantidad_producto) * (ft.porcentaje_oferta / 100))
	END AS precio_con_descuento
   FROM t_ofertas ft,
    t_inventarios iv,
	t_tipo_productos tp,
	t_tipos_mascotas tm
  WHERE ft.id_inventario = iv.id_inventario AND iv.id_tipo_producto = tp.id_tipo_producto AND tm.id_tipo_mascota = iv.id_tipo_mascota;

ALTER TABLE public.v_citas
    OWNER TO veterinarias;


CREATE OR REPLACE FUNCTION public.f_read_descuento(
	i_id_inventario numeric,
	i_porcentaje_oferta numeric)
    RETURNS SETOF v_ofertas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN query
 SELECT * FROM v_ofertas
 WHERE v_ofertas.id_inventario = i_id_inventario AND v_ofertas.porcentaje_oferta = i_porcentaje_oferta;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_createofertas(
	i_porcentaje_oferta numeric,
	i_tipo_descuento numeric,
	i_id_inventario numeric)
    RETURNS SETOF t_ofertas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN
 RETURN QUERY
 INSERT INTO t_ofertas(porcentaje_oferta, tipo_descuento, id_inventario)
	
	VALUES (i_porcentaje_oferta, i_tipo_descuento, i_id_inventario)
	
	RETURNING *;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_updateofertas(
	i_id_oferta numeric,
	i_porcentaje_oferta numeric,
	i_tipo_descuento numeric,
	i_id_inventario numeric)
    RETURNS SETOF t_ofertas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN
 RETURN QUERY
 UPDATE t_ofertas
 	SET porcentaje_oferta = i_porcentaje_oferta, tipo_descuento = i_tipo_descuento,
 	id_inventario = i_id_inventario
	
	WHERE (id_oferta = i_id_oferta)
	
	RETURNING *;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_deleteofertas(
	i_id_oferta numeric)
    RETURNS SETOF t_ofertas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 DELETE FROM t_ofertas WHERE t_ofertas.id_oferta = i_id_oferta
 RETURNING *;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_readinventarios_veterinaria()
    RETURNS SETOF t_inventarios 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM t_inventarios;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_readofertas()
    RETURNS SETOF v_ofertas
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM v_ofertas;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_readofertas_veterinaria(
	i_id_usuario numeric)
    RETURNS SETOF v_ofertas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM v_ofertas WHERE v_ofertas.id_usuario=i_id_usuario;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_readofertas_producto(
	i_id_tipo_producto numeric)
    RETURNS SETOF v_ofertas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM v_ofertas WHERE v_ofertas.id_tipo_producto=i_id_tipo_producto;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_readofertas_mascota(
	i_id_tipo_mascota numeric)
    RETURNS SETOF v_ofertas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
 SELECT * FROM v_ofertas WHERE v_ofertas.id_tipo_mascota=i_id_tipo_mascota;
 END;
$BODY$;



CREATE SEQUENCE public.t_fotos_inventarios_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;



CREATE TABLE public.t_fotos_inventarios
(
    id numeric NOT NULL DEFAULT nextval('t_fotos_inventarios_id_seq'::regclass),
    ruta_guardado text COLLATE pg_catalog."default",
    nombre_imagen text COLLATE pg_catalog."default",
    id_inventario numeric NOT NULL,
    consecutivo numeric NOT NULL,
    CONSTRAINT t_fotos_inventarios_pkey PRIMARY KEY (id),
    CONSTRAINT t_fotos_inventarios_id_inventario_fk FOREIGN KEY (id_inventario)
        REFERENCES public.t_inventarios (id_inventario) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)



CREATE OR REPLACE FUNCTION public.f_compararfotosinventario(
	s_id_inventario numeric,
	s_consecutivo numeric)
    RETURNS SETOF t_fotos_inventarios 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN QUERY
 
 SELECT * FROM public.t_fotos_inventarios 
 where t_fotos_inventarios.id_inventario = s_id_inventario AND t_fotos_inventarios.consecutivo=s_consecutivo;

 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_insert_t_fotos_inventarios(
	i_ruta_guardado text,
	i_nombre_imagen text,
	i_id_inventario numeric,
	i_consecutivo numeric)
    RETURNS SETOF t_fotos_inventarios 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN
 RETURN QUERY
 
 INSERT INTO t_fotos_inventarios
                (ruta_guardado,
                nombre_imagen, 
                id_inventario,
                consecutivo) 
                VALUES (i_ruta_guardado,i_nombre_imagen , i_id_inventario,i_consecutivo )

	RETURNING *;
 END;
$BODY$;


CREATE OR REPLACE FUNCTION public.f_readfotosforid_inventario(
	s_id_inventario numeric)
    RETURNS SETOF t_fotos_inventarios 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN QUERY
 SELECT * FROM t_fotos_inventarios WHERE t_fotos_inventarios.id_inventario = s_id_inventario;
 

 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_update_t_fotos_inventarios(
	i_ruta_guardado text,
	i_nombre_imagen text,
	i_id_inventario numeric,
	i_consecutivo numeric)
    RETURNS SETOF t_fotos_inventarios 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN
 RETURN QUERY
 
 UPDATE t_fotos_inventarios SET ruta_guardado= i_ruta_guardado, nombre_imagen=i_nombre_imagen WHERE id_inventario=i_id_inventario AND  consecutivo= i_consecutivo
 
	RETURNING *;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_getidfotoinventariobyid(
	i_id_inventario numeric)
    RETURNS SETOF t_fotos_inventarios 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 BEGIN
 RETURN QUERY
	SELECT * FROM t_fotos_inventarios where id_inventario = i_id_inventario AND consecutivo=1;
 END;
$BODY$;



CREATE OR REPLACE VIEW public.v_inventarios
 AS
 SELECT iv.id_inventario,
    iv.nombre_producto,
    iv.id_tipo_producto,
    tp.tipo AS nombre_tipo_producto,
    iv.id_tipo_mascota,
    tm.nombre_tipo AS nombre_tipo_mascota,
    iv.precio_producto,
    iv.cantidad_producto,
    tf.id AS id_foto,
    tf.consecutivo,
    iv.id_usuario,
    tu.primer_nombre,
    tu.primer_apellido
   FROM t_inventarios iv
	INNER JOIN t_tipo_productos tp USING (id_tipo_producto)
	INNER JOIN t_tipos_mascotas tm USING (id_tipo_mascota)
	INNER JOIN t_usuario tu ON iv.id_usuario = tu.id
	LEFT JOIN t_fotos_inventarios tf USING (id_inventario);


CREATE OR REPLACE FUNCTION public.f_readinventarios_fotosid(
	i_id_usuario numeric)
    RETURNS TABLE(id_inventario numeric, nombre_producto character varying, id_tipo_producto numeric, nombre_tipo_producto character varying, id_tipo_mascota numeric, nombre_tipo_mascota text, precio_producto numeric, cantidad_producto numeric, id_fotos text, consecutivos text, id_usuario numeric, primer_nombre character varying, primer_apellido character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN QUERY
 SELECT v_inventarios.id_inventario, v_inventarios.nombre_producto, v_inventarios.id_tipo_producto,
 v_inventarios.nombre_tipo_producto, v_inventarios.id_tipo_mascota, v_inventarios.nombre_tipo_mascota,
 v_inventarios.precio_producto, v_inventarios.cantidad_producto,
 STRING_AGG(v_inventarios.id_foto::character varying, ',' ORDER BY v_inventarios.id_foto) id_fotos,
 STRING_AGG(v_inventarios.consecutivo::character varying, ',' ORDER BY v_inventarios.consecutivo) consecutivos,
 v_inventarios.id_usuario, v_inventarios.primer_nombre, v_inventarios.primer_apellido
 FROM v_inventarios
 WHERE v_inventarios.id_usuario = i_id_usuario
 GROUP BY v_inventarios.id_inventario, v_inventarios.nombre_producto, v_inventarios.id_tipo_producto,
 v_inventarios.nombre_tipo_producto, v_inventarios.id_tipo_mascota, v_inventarios.nombre_tipo_mascota,
 v_inventarios.precio_producto, v_inventarios.cantidad_producto, v_inventarios.id_usuario,
 v_inventarios.primer_nombre, v_inventarios.primer_apellido;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_readinventarios()
    RETURNS TABLE(id_inventario numeric, nombre_producto character varying, id_tipo_producto numeric, nombre_tipo_producto character varying, id_tipo_mascota numeric, nombre_tipo_mascota text, precio_producto numeric, cantidad_producto numeric, id_fotos text, consecutivos text, id_usuario numeric, primer_nombre character varying, primer_apellido character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN QUERY
 SELECT v_inventarios.id_inventario, v_inventarios.nombre_producto, v_inventarios.id_tipo_producto,
 v_inventarios.nombre_tipo_producto, v_inventarios.id_tipo_mascota, v_inventarios.nombre_tipo_mascota,
 v_inventarios.precio_producto, v_inventarios.cantidad_producto,
 STRING_AGG(v_inventarios.id_foto::character varying, ',' ORDER BY v_inventarios.id_foto) id_fotos,
 STRING_AGG(v_inventarios.consecutivo::character varying, ',' ORDER BY v_inventarios.consecutivo) consecutivos,
 v_inventarios.id_usuario, v_inventarios.primer_nombre, v_inventarios.primer_apellido
 FROM v_inventarios
 GROUP BY v_inventarios.id_inventario, v_inventarios.nombre_producto, v_inventarios.id_tipo_producto,
 v_inventarios.nombre_tipo_producto, v_inventarios.id_tipo_mascota, v_inventarios.nombre_tipo_mascota,
 v_inventarios.precio_producto, v_inventarios.cantidad_producto, v_inventarios.id_usuario,
 v_inventarios.primer_nombre, v_inventarios.primer_apellido;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_searcht_localidad_departamentos(
	i_id_codigo numeric)
    RETURNS SETOF t_ubicaciones_geograficas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 ubicacion_row t_ubicaciones_geograficas%rowtype;
 BEGIN
 SELECT * FROM t_ubicaciones_geograficas INTO ubicacion_row WHERE t_ubicaciones_geograficas.id_codigo=i_id_codigo AND t_ubicaciones_geograficas.vigente='true' AND t_ubicaciones_geograficas.tipo='PA';
 CASE ubicacion_row.descripcion WHEN 'COLOMBIA' THEN
 	RETURN QUERY
	SELECT * FROM t_ubicaciones_geograficas WHERE t_ubicaciones_geograficas.tipo='DP' AND t_ubicaciones_geograficas.vigente='true';
 WHEN 'ESTADOS UNIDOS' THEN
 	RETURN QUERY
	SELECT * FROM t_ubicaciones_geograficas WHERE t_ubicaciones_geograficas.tipo='DPU' AND t_ubicaciones_geograficas.vigente='true';	
 ELSE
 	RETURN QUERY
 	SELECT * FROM t_ubicaciones_geograficas WHERE t_ubicaciones_geograficas.id_codigo=i_id_codigo AND t_ubicaciones_geograficas.vigente='true' AND t_ubicaciones_geograficas.tipo='PA';
 END CASE;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_searcht_localidad_municipios(
	i_id_codigo numeric)
    RETURNS SETOF t_ubicaciones_geograficas 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE
 ubicacion_row t_ubicaciones_geograficas%rowtype;
 BEGIN
 SELECT * FROM t_ubicaciones_geograficas INTO ubicacion_row WHERE t_ubicaciones_geograficas.id_codigo=i_id_codigo AND t_ubicaciones_geograficas.vigente='true';
 CASE ubicacion_row.tipo WHEN 'DP' THEN
 	RETURN QUERY
	SELECT * FROM t_ubicaciones_geograficas WHERE t_ubicaciones_geograficas.id_unde=ubicacion_row.id_codigo AND (t_ubicaciones_geograficas.tipo='MN' OR t_ubicaciones_geograficas.tipo='MC' OR t_ubicaciones_geograficas.tipo='CP' OR t_ubicaciones_geograficas.tipo='LC') AND t_ubicaciones_geograficas.vigente='true';
 WHEN 'DPU' THEN
 	RETURN QUERY
	SELECT * FROM t_ubicaciones_geograficas WHERE t_ubicaciones_geograficas.id_unde=ubicacion_row.id_codigo AND t_ubicaciones_geograficas.tipo='CO' AND t_ubicaciones_geograficas.vigente='true';
 ELSE
 	RETURN QUERY
 	SELECT * FROM t_ubicaciones_geograficas WHERE t_ubicaciones_geograficas.id_codigo=i_id_codigo AND t_ubicaciones_geograficas.vigente='true' AND t_ubicaciones_geograficas.tipo!='PA';
 END CASE;
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_readv_usuarios_conex(
	s_id_usuario numeric)
    RETURNS SETOF v_usuarios_conex 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN query
 SELECT *
 FROM v_usuarios_conex WHERE v_usuarios_conex.id_usuario = s_id_usuario; 
 END;
$BODY$;



CREATE OR REPLACE FUNCTION public.f_readgt_empresa_usuario(
	r_id numeric)
    RETURNS TABLE(id_empresa numeric, razon_social character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
DECLARE 
 BEGIN 
 RETURN query
 SELECT e.id as id_empresa , e.razon_social  FROM t_empresa as e WHERE e.id_usuario = r_id;
 END;
$BODY$;