# Instrucciones para Arreglar el Deployment

## Problema
Los botones se ven perfectamente en el preview local pero no aparecen cuando publicas el sitio en producción.

## Causa
El archivo `.replit` tiene configuraciones incorrectas que impiden que los archivos compilados se sirvan correctamente.

## Solución: Cambios Necesarios en `.replit`

Necesitas hacer **2 cambios manualmente** en el archivo `.replit`:

### 1. Cambiar `publicDir` de `/` a `dist`

**Busca esta línea:**
```toml
publicDir = "/"
```

**Cámbiala a:**
```toml
publicDir = "dist"
```

### 2. Cambiar `externalPort` de `5000` a `80`

**Busca esta sección al final del archivo:**
```toml
[[ports]]
localPort = 5000
externalPort = 5000
```

**Cámbiala a:**
```toml
[[ports]]
localPort = 5000
externalPort = 80
```

## Por qué estos cambios son necesarios

1. **publicDir = "dist"**: Le dice a Replit que sirva los archivos desde la carpeta `dist/` donde Vite compila todo (incluyendo tus botones de JavaScript). Sin esto, está sirviendo los archivos sin compilar.

2. **externalPort = 80**: Para deployments de tipo Autoscale, Replit requiere que el puerto externo sea 80 (el puerto HTTP estándar). Esto permite que tu sitio funcione en `seragro.gruposer.com.ar` sin necesidad de especificar un puerto.

## Cómo Aplicar los Cambios

1. Abre el archivo `.replit` en el editor
2. Haz los 2 cambios mencionados arriba
3. Guarda el archivo
4. Vuelve a publicar (Deploy) el sitio

**Después de estos cambios, los botones aparecerán correctamente en producción.**
