import { DarkModeContext } from "../theme/DarkModeContext";
import { useContext } from "react";

function DialogOrderDetail ({ordine}){
    //console.log(ordine)
    //console.log('ppp')
    const { darkMode } = useContext(DarkModeContext);

return(

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{maxHeight:"50%", marginTop:"25vh"}}>
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable " >
        <div className={
              "modal-content " + (!darkMode ? "sfondo3" : "sfondocard1")
            }>
          <div className="modal-header " style={darkMode? { borderColor: "#9ba4b5"} : {borderColor:"#f1f6f9"}}>
            <h5 className="modal-title" id="exampleModalLabel">Codice{" "+ordine.id_order}</h5>
            <button  type="button" className={
                  "close nav1buttonl " + (darkMode ? "testolight" : "testodark")
                }
                 data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p><b>Corriere: </b>{ordine.courier_name?" "+ordine.courier_name:"-"}</p>
            <hr style={{borderColor: darkMode? "#9ba4b5": "#f1f6f9", opacity:"0.5", width:"70%"}}></hr>
            <p><b>Stato: </b>{ordine.order_status?" "+ordine.order_status:"-"}</p>
            <hr style={{borderColor: darkMode? "#9ba4b5": "#f1f6f9", opacity:"0.5", width:"70%"}}></hr>
            <p><b>Consegna stimata: </b>{ordine.expected_delivery_date?" "+ordine.expected_delivery_date:"-"}</p>
            <hr style={{borderColor: darkMode? "#9ba4b5": "#f1f6f9", opacity:"0.5", width:"70%"}}></hr>

            <p><b>Tracking: </b>{ordine.tracking_code?" "+ordine.tracking_code:"-"}</p>
            <hr style={{borderColor: darkMode? "#9ba4b5": "#f1f6f9", opacity:"0.5", width:"70%"}}></hr>

            <p><b>Totale: </b>{ordine.price?" "+ordine.price:"-"}</p>
            <hr style={{borderColor: darkMode? "#9ba4b5": "#f1f6f9", opacity:"0.5", width:"70%"}}></hr>

            <p><b>Totale originale: </b>{ordine.original_price? " "+ordine.original_price:"-"}</p>
            <hr style={{borderColor: darkMode? "#9ba4b5": "#f1f6f9", opacity:"0.5", width:"70%"}}></hr>

            <p><b>Sconto totale: </b>{ordine.discount? " "+ordine.discount:"-"}</p>
            <hr style={{borderColor: darkMode? "#9ba4b5": "#f1f6f9", opacity:"0.5", width:"70%"}}></hr>

            <p><b>Data dell'ordine: </b>{ordine.order_date? " "+ordine.order_date:"-"}</p>
            <hr style={{borderColor: darkMode? "#9ba4b5": "#f1f6f9", opacity:"0.5", width:"70%"}}></hr>

            <p><b>Data consegna: </b>{ordine.delivery_data? " "+ordine.delivery_data : "-"}</p>
            <hr style={{borderColor: darkMode? "#9ba4b5": "#f1f6f9", opacity:"0.5", width:"70%"}}></hr>

            <p><b>Data spedizione: </b>{ordine.start_shipping_date? " "+ordine.start_shipping_date : "-"}</p>
            

          </div>
          {/*<div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
</div>*/}
        </div>
      </div>
    </div>
)}

export default DialogOrderDetail;