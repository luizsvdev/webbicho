package br.com.webbicho.server.shared.annotations

import br.com.webbicho.server.shared.classes.WbUUIDGenerator
import org.hibernate.annotations.ValueGenerationType

@ValueGenerationType(generatedBy = WbUUIDGenerator::class)
@Retention(AnnotationRetention.RUNTIME)
@Target(AnnotationTarget.FIELD)
annotation class WbGeneratedUUID
