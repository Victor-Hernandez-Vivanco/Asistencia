SELECT
    s.codseccion,
    s.seccion ,
    s.nombre_seccion AS nombre_seccion,
    p.idprofesor,
    p.nombre AS nombre_profesor,
    p.apellido AS apellido_profesor,
    a.idalumno,
    a.nombre AS nombre_alumno,
    a.apellido AS apellido_alumno, 
    a.estado
FROM
    seccion s
JOIN
    profesor_seccion ps ON s.idseccion = ps.idseccion
JOIN
    profesor p ON ps.idprofesor = p.idprofesor
LEFT JOIN
    alumno_seccion asa ON s.idseccion = asa.idseccion
LEFT JOIN
    alumno a ON asa.idalumno = a.idalumno
    order by s.idseccion asc;
    
    --------------------------
    
    SELECT 
    a.IDALUMNO, 
    a.NOMBRE, 
    a.apellido, 
    a.estado, 
    s.IDSECCION, 
    s.NOMBRE_SECCION, 
    s.seccion, 
    s.codseccion 
    FROM seccion s 
    LEFT JOIN alumno_seccion sa 
    ON s.idseccion = sa.idseccion 
    LEFT JOIN alumno a ON sa.IDALUMNO = a.IDALUMNO 
    WHERE a.IDALUMNO = a.idAlumno
    