package br.com.webbicho.server.shared.models.entities.user

import br.com.webbicho.server.shared.models.entities.WbEntity
import br.com.webbicho.server.shared.models.enums.EUserRole
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated

@Entity
class User(
    @Column(
        nullable = false,
        unique = true,
        length = 30
    )
    var username: String,

    @Column
    var exibitionName: String? = null,

    @Column(length = 320)
    var email: String,

    @Column(columnDefinition = "TEXT")
    var about: String? = null,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    var role: EUserRole = EUserRole.USER,

    @Column(columnDefinition = "TEXT")
    var avatar: String? = null,


    ) : WbEntity()
